const { _ } = Cypress

describe("Multiple Choice Challenge", () => {
  beforeEach(() => {
    cy.visit(
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )
  })

  it("does not display the video hero section", () => {
    cy.getBySel("lesson-hero").should("not.exist")
  })

  it.only("the TOC links to the correct content section when clicked", () => {
    cy.getBySel("toc-sidebar").within(($toc) => {
      cy.get("a").each(($link) => {
        const href = $link.attr("href")
        cy.wrap($link).click()

        cy.window()
          .its("scrollY")
          .should("equal", Math.ceil(cy.$$(`${href}`).offset().top))
      })
    })
  })

  it("shows the challenge", () => {
    cy.getBySel("multiple-choice-challenge").should("exist")
  })

  it("displays the lightbox whenever an image is clicked", () => {
    cy.get(".lesson-content img").its(0).click()
    cy.get("#modal").should("be.visible")
  })

  it("the lightbox closes when the close button is clicked", () => {
    cy.get(".lesson-content img").its(0).click()
    cy.get("#modal .modal-content .close").click()
    cy.get("#modal").should("not.be.visible")
  })
})

export {}
