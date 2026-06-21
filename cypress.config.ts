import { defineConfig } from 'cypress'
import 'dotenv/config'

export default defineConfig({
  projectId: 'a6xq37',
  viewportHeight: 1000,
  viewportWidth: 1400,
  blockHosts: ['*.osano.com'], // blocking the cookie popup from tests
  expose: {
    mobileViewportWidthBreakpoint: 414,
    siteURL: process.env.SITE_URL,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})
