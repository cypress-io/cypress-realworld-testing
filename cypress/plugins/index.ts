/// <reference types="cypress" />
// @ts-ignore
require("dotenv").config()

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
export default (on, config) => {
  config.env.siteURL = process.env.SITE_URL

  return config
}
