import fs from 'fs'
import path from 'path'

// CONTENT_PATH is useful when you want to get the path to a specific file
export const CONTENT_PATH = path.join(process.cwd(), 'content')
export const TUTORIAL_PATH = path.join(process.cwd(), 'content/tutorial')

// contentFilePaths is the list of all mdx files inside the CONTENT_PATH directory
export const contentFilePaths = fs
  .readdirSync(CONTENT_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

export const tutorialFilePaths = fs
  .readdirSync(TUTORIAL_PATH)
  .filter((path) => /\.mdx?$/.test(path))