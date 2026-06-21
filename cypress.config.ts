import { defineConfig } from 'cypress'
import 'dotenv/config'

export default defineConfig({
  projectId: 'a6xq37',
  viewportHeight: 1000,
  viewportWidth: 1400,
  blockHosts: ['*.osano.com'], // blocking the cookie popup from tests
  // Non-sensitive, public configuration belongs in `expose` and is read in
  // tests with `Cypress.expose()` (Cypress 15.10.0+). Use the `env` key plus
  // `cy.env()` only for sensitive values you want to keep out of the browser.
  expose: {
    mobileViewportWidthBreakpoint: 414,
    siteURL: process.env.SITE_URL,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})
