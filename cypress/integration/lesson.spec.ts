describe("Multiple Choice Challenge", () => {
  beforeEach(() => {
    // 1280 is the XL breakpoint for Tailwind
    cy.viewport(1280, 768)
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
  })

  it("does not display the video hero section", () => {
    cy.getBySel("lesson-hero").should("not.exist")
  })

  it("the TOC links to the correct content section when clicked", () => {
    cy.getBySel("install").click()
    cy.window()
      .its("scrollY")
      .should("equal", Math.ceil(cy.$$("#install").offset().top))

    cy.getBySel("app-overview").click()
    cy.window()
      .its("scrollY")
      .should("equal", Math.ceil(cy.$$("#app-overview").offset().top))
  })

  it("shows the challenge", () => {
    cy.getBySel("next-lesson-button").should("exist")
  })

  // it("the progress state is preserved upon refresh", () => {})

  // it("displays the complete section button when a section is completed and navigates to the homepage ", () => {})
})

export {}
