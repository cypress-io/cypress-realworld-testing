import { expect } from "chai"
import fs from "fs"
import path from "path"
import nextConfig from "../next.config"

// `next export` ignores redirects() in next.config.js, so Cloudflare Pages
// reads public/_redirects instead. The two lists must stay identical.
describe("redirects", () => {
  it("public/_redirects matches redirects() in next.config.js", async () => {
    const nextRedirects = (await nextConfig.redirects()).map(
      ({ source, destination, permanent }) =>
        `${source} ${destination} ${permanent ? 301 : 302}`
    )

    const pagesRedirects = fs
      .readFileSync(path.join(__dirname, "../public/_redirects"), "utf8")
      .split("\n")
      .map((line) => line.trim().split(/\s+/).join(" "))
      .filter((line) => line && !line.startsWith("#"))

    expect(pagesRedirects).to.deep.equal(nextRedirects)
  })
})
