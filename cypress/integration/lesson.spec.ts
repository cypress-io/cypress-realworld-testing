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

  it("the TOC links to the correct content section when clicked", () => {
    cy.getBySel("toc-sidebar").within(() => {
      cy.get("a").each(($link) => {
        const href = $link.attr("href")
        console.log(href)
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
