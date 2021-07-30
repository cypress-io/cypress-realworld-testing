import fs from 'fs'
import path from 'path'

export const CONTENT_PATH = path.join(process.cwd(), 'content')
export const TUTORIAL_PATH = path.join(process.cwd(), 'content/tutorial')

export const TESTING_APP_PATH = path.join(process.cwd(), 'content/testing-your-first-app')
export const TESTING_FOUNDATIONS_PATH = path.join(process.cwd(), 'content/testing-foundations')
export const CYPRESS_FUNDAMENTALS_PATH = path.join(process.cwd(), 'content/cypress-fundamentals')
export const REALWORLD_EXAMPLES_PATH = path.join(process.cwd(), 'content/real-world-examples')

// contentFilePaths is the list of all mdx files inside the CONTENT_PATH directory
export const contentFilePaths = fs
  .readdirSync(CONTENT_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

export const tutorialFilePaths = fs
  .readdirSync(TUTORIAL_PATH)
  .filter((path) => /\.mdx?$/.test(path))