if (Cypress.platform === "linux") {
  describe("Robots.txt", function () {
    it("disallows all pages to be crawled", function () {
      cy.request("/robots.txt").its("body").should("contain", "Disallow: /")
    })

    it("allows all user agents", function () {
      cy.request("/robots.txt").its("body").should("contain", "User-agent: *")
    })

    it("has the correct Host URL", function () {
      cy.request("/robots.txt")
        .its("body")
        .should("contain", `Host: ${Cypress.env("siteURL")}`)
    })

    it("has the correct url for the Sitemap", function () {
      cy.request("/robots.txt")
        .its("body")
        .should("contain", `Sitemap: ${Cypress.env("siteURL")}`)
    })
  })
}

export {}
