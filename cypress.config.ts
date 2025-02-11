import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'a6xq37',
  viewportHeight: 1000,
  viewportWidth: 1400,
  blockHosts: ['*.osano.com'], // blocking the cookie popup from tests
  env: {
    mobileViewportWidthBreakpoint: 414,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts').default(on, config)
    },
    baseUrl: 'http://localhost:3000',
  },
})
