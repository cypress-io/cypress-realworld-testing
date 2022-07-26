const { _ } = Cypress
import { isMobile } from "../support/utils"

describe("Lesson Pages", () => {
  beforeEach(() => {
    cy.visit("/cypress-fundamentals/cypress-ui-overview")
  })

  it("shows the challenge", () => {
    cy.getBySel("multiple-choice-challenge").should("exist")
  })

  it("displays the lightbox whenever an image is clicked", () => {
    cy.get(".prose img").its(0).click()
    cy.get("#modal").should("be.visible")
  })

  it("the lightbox closes when the close button is clicked", () => {
    cy.get(".prose img").its(0).click()
    cy.get("#modal .modal-content .close").click()
    cy.get("#modal").should("not.be.visible")
  })

  context("Table of Contents", () => {
    it("links to the correct content lesson when clicked", () => {
      cy.visit("/testing-your-first-application/app-install-and-overview")
      cy.getBySel("sidebar-toc-link-1").click({ force: true })
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/installing-cypress-and-writing-your-first-test"
      )

      cy.getBySel("sidebar-toc-link-2").click({ force: true })
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/how-to-test-forms-and-custom-cypress-commands"
      )

      cy.getBySel("sidebar-toc-link-4").click({ force: true })
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/how-to-test-user-journeys"
      )
    })
  })
})

export {}
