describe("Multiple Choice Challenge", () => {
  beforeEach(() => {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
  })

  it("does not display the video hero section", () => {
    cy.getBySel("lesson-hero").should("not.exist")
  })

  it("the TOC links to the correct content section when clicked", () => {
    cy.getBySel("todomvc-app-install-and-overview").click()
    cy.window()
      .its("scrollY")
      .should(
        "equal",
        Math.ceil(cy.$$("#todomvc-app-install-and-overview").offset().top)
      )

    cy.getBySel("another-subheader").click()
    cy.window()
      .its("scrollY")
      .should("equal", Math.ceil(cy.$$("#another-subheader").offset().top))
  })

  it("shows the challenge", () => {
    cy.getBySel("next-lesson-button").should("exist")
  })
})

export {}
