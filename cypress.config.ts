import { defineConfig } from 'cypress'
import 'dotenv/config'

export default defineConfig({
  projectId: 'a6xq37',
  viewportHeight: 1000,
  viewportWidth: 1400,
  blockHosts: ['*.osano.com'], // blocking the cookie popup from tests
  env: {
    mobileViewportWidthBreakpoint: 414,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      config.env.siteURL = process.env.SITE_URL

      return config
    },
    
  },
})
