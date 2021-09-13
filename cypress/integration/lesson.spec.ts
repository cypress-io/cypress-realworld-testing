const { _ } = Cypress

describe("Multiple Choice Challenge", () => {
  beforeEach(() => {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
  })

  it("does not display the video hero section", () => {
    cy.getBySel("lesson-hero").should("not.exist")
  })

  it("the TOC links to the correct content section when clicked", () => {
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
})

export {}
