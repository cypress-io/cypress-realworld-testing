import "./commands"

// The cookie banner and analytics scripts get an empty response, so test runs
// don't show Osano's banner or create real GA4 or FullStory visitors. Specs that
// need FullStory stub window.FS themselves (cypress/e2e/fullstory.cy.ts).
const THIRD_PARTY_HOSTS = [
  /(^|\.)osano\.com$/,
  /(^|\.)googletagmanager\.com$/,
  /(^|\.)google-analytics\.com$/,
  /(^|\.)fullstory\.com$/,
]

beforeEach(() => {
  for (const hostname of THIRD_PARTY_HOSTS) {
    cy.intercept({ hostname }, { statusCode: 200, body: "" })
  }
})
