if (Cypress.platform === "linux") {
  describe("Robots.txt", function () {
    it("allows all pages to be crawled", function () {
      cy.request("/robots.txt").its("body").should("contain", "Allow: /")
    })

    it("allows all user agents", function () {
      cy.request("/robots.txt").its("body").should("contain", "User-agent: *")
    })

    it("has the correct Host URL", function () {
      cy.request("/robots.txt")
        .its("body")
        .should("contain", `Host: ${Cypress.expose("siteURL")}`)
    })

    it("has the correct url for the Sitemap", function () {
      cy.request("/robots.txt")
        .its("body")
        .should("contain", `Sitemap: ${Cypress.expose("siteURL")}`)
    })
  })
}

export {}
