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
    if (!isMobile()) {
      it("the TOC links to the correct content section when clicked", () => {
        cy.getBySel("toc-sidebar").within(() => {
          cy.getBySel("toc-link").each(($link, index) => {
            const href = $link.attr("href")
            cy.wrap($link).click()

            cy.window().then(($window) => {
              expect($window.scrollY).to.be.closeTo(
                Math.ceil(cy.$$(`${href}`).offset().top),
                5
              )
            })
          })
        })
      })
    }

    it("links to the correct content lesson when clicked", () => {
      cy.visit(
        "/testing-your-first-application/todomvc-app-install-and-overview"
      )
      cy.getBySel("sidebar-toc-link-1").click({ force: true })
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
      )

      cy.getBySel("sidebar-toc-link-2").click({ force: true })
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/setting-up-data-before-each-test"
      )

      cy.getBySel("sidebar-toc-link-4").click({ force: true })
      cy.location("pathname").should(
        "eq",
        "/testing-your-first-application/cypress-command-logs-snapshots-and-aliases"
      )
    })
  })
})

export {}
