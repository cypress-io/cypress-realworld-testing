import { execFileSync } from "child_process"
import fs from "fs"
import path from "path"
import sharp from "sharp"

// Shrinks the raster images in public/images in place, keeping file names and
// formats so no content references change. Safe to re-run: a file is only
// rewritten when the result is meaningfully smaller.
//
//   yarn optimize-images               # all of public/images
//   yarn optimize-images a.png some/dir  # specific files or folders
//   yarn optimize-images --staged      # images staged in git (pre-commit hook)

// Lessons render images ~800 CSS px wide, and the click-to-zoom modal at 90% of
// the viewport, so 1920 px keeps screenshots sharp without retina-sized files.
const MAX_WIDTH = 1920
const JPEG_QUALITY = 82
// libimagequant (same engine as pngquant); falls back to lossless PNG when the
// palette version would visibly differ (PSNR below MIN_PSNR).
const PNG_PALETTE_QUALITY = 90
const MIN_PSNR = 40
// Skip rewrites that save less than this, so re-runs don't churn files.
const MIN_SAVINGS = 0.05

const args = process.argv.slice(2)
const staged = args.includes("--staged")

// Added or modified files under public/images in the git index.
function stagedFiles(): string[] {
  return execFileSync(
    "git",
    [
      "diff",
      "--cached",
      "--name-only",
      "--diff-filter=AM",
      "-z",
      "--",
      "public/images",
    ],
    { encoding: "utf8" }
  )
    .split("\0")
    .filter(Boolean)
}

function walk(target: string): string[] {
  if (fs.statSync(target).isFile()) return [target]
  return fs
    .readdirSync(target, { withFileTypes: true })
    .flatMap((entry) => walk(path.join(target, entry.name)))
}

function resize(file: string, options?: sharp.SharpOptions) {
  return sharp(file, options).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  })
}

async function psnr(a: Buffer, b: Buffer) {
  const [rawA, rawB] = await Promise.all(
    [a, b].map((buffer) => sharp(buffer).ensureAlpha().raw().toBuffer())
  )
  let squaredError = 0
  for (let i = 0; i < rawA.length; i++) {
    const diff = rawA[i] - rawB[i]
    squaredError += diff * diff
  }
  const mse = squaredError / rawA.length
  return mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse)
}

async function optimizePng(file: string) {
  const lossless = await resize(file)
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer()
  const palette = await resize(file)
    .png({
      palette: true,
      quality: PNG_PALETTE_QUALITY,
      compressionLevel: 9,
      effort: 10,
    })
    .toBuffer()

  if (
    palette.length < lossless.length &&
    (await psnr(lossless, palette)) >= MIN_PSNR
  ) {
    return palette
  }
  return lossless
}

function optimizeJpeg(file: string) {
  return resize(file).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
}

function optimizeGif(file: string) {
  return resize(file, { animated: true }).gif({ effort: 10 }).toBuffer()
}

const optimizers: Record<string, (file: string) => Promise<Buffer>> = {
  ".png": optimizePng,
  ".jpg": optimizeJpeg,
  ".jpeg": optimizeJpeg,
  ".gif": optimizeGif,
}

async function main() {
  const targets = staged
    ? stagedFiles()
    : args.length
    ? args
    : ["public/images"]
  const files = targets.flatMap((target) => walk(path.resolve(target)))
  const rewritten: string[] = []
  let before = 0
  let after = 0

  for (const file of files) {
    const extension = path.extname(file).toLowerCase()
    const relative = path.relative(process.cwd(), file)
    const original = fs.statSync(file).size

    // Design-tool exports sometimes wrap a huge bitmap in an SVG; those need
    // redrawing as real vectors, which this script can't do.
    if (
      extension === ".svg" &&
      fs.readFileSync(file, "utf8").includes("data:image/")
    ) {
      console.warn(
        `⚠️  ${relative} (${Math.round(original / 1024)} KB) embeds a bitmap`
      )
    }

    const optimize = optimizers[extension]
    if (!optimize) continue

    const optimized = await optimize(file)
    before += original
    if (optimized.length <= original * (1 - MIN_SAVINGS)) {
      fs.writeFileSync(file, new Uint8Array(optimized))
      rewritten.push(file)
      after += optimized.length
      console.log(
        `${relative}: ${Math.round(original / 1024)} KB → ${Math.round(
          optimized.length / 1024
        )} KB`
      )
    } else {
      after += original
    }
  }

  // Commit the optimized versions rather than the originals.
  if (staged && rewritten.length) {
    execFileSync("git", ["add", "--", ...rewritten])
  }

  if (before) {
    const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1)
    console.log(`\nRaster images: ${mb(before)} MB → ${mb(after)} MB`)
  }
}

main()
