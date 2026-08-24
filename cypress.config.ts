import { defineConfig } from 'cypress'
import 'dotenv/config'

export default defineConfig({
  projectId: 'a6xq37',
  // `Cypress.env()` exposes values to any browser code, so it is disabled here.
  // Read public config with `Cypress.expose()` and secrets with `cy.env()`.
  allowCypressEnv: false,
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
