import fs from 'fs'
import path from 'path'
import glob from "glob";

export const CONTENT_PATH = path.join(process.cwd(), 'content')

export const contentFilePaths = fs
  .readdirSync(CONTENT_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

export const allContentFilePaths = glob.sync('content/**/*')
  .filter((path) => /\.mdx?$/.test(path))
  .map((path) => path.replace(/^content\//, ''))