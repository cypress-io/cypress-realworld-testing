describe("Free Form Challenge", () => {
  beforeEach(() => {
    // 1280 is the XL breakpoint for Tailwind
    cy.viewport(1280, 768)
    cy.visit(
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )
  })

  it.only("it displays the next lesson button when an answer is correct and updates the progress sidebar", () => {
    cy.get("#answer").type("cy.get('.new-todo').should('exist')")
    cy.get("button[type='submit']").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-1").should("have.class", "bg-indigo-600")
  })
})

export {}
