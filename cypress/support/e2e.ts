import "./commands"

// The cookie banner and FullStory get an empty response, so local test runs don't
// show Osano's banner and no run creates real FullStory visitors. Specs that need
// FullStory stub window.FS themselves (cypress/e2e/fullstory.cy.ts).
//
// Google Analytics is left alone, as it was before FullStory: intercepting it
// on every page load broke link navigation in recorded CI runs. CircleCI builds
// don't render Osano (pages/_document.js) and have no FullStory org ID, so CI
// pages make none of these requests.
const THIRD_PARTY_HOSTS = [/(^|\.)osano\.com$/, /(^|\.)fullstory\.com$/]

beforeEach(() => {
  for (const hostname of THIRD_PARTY_HOSTS) {
    cy.intercept({ hostname }, { statusCode: 200, body: "" })
  }
})
