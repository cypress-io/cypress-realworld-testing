describe("RWT Home", function () {
  beforeEach(function () {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
  })

  it("render the home page", function () {
    cy.get("h1").first().should("contain", "Real World Testing with Cypress")
  })
})

export {}
