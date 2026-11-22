import "./commands"

// The cookie banner and FullStory get an empty response, so test runs don't show
// Osano's banner and never create real FullStory visitors. Specs that need
// FullStory stub window.FS themselves (cypress/e2e/fullstory.cy.ts). Google
// Analytics is left alone, as it was before FullStory was added.
const THIRD_PARTY_HOSTS = [/(^|\.)osano\.com$/, /(^|\.)fullstory\.com$/]

beforeEach(() => {
  for (const hostname of THIRD_PARTY_HOSTS) {
    cy.intercept({ hostname }, { statusCode: 200, body: "" })
  }
})
