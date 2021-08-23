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

  it.only("it does not display the next lesson button when an answer is incorrect and does updates the progress sidebar", () => {
    cy.get("#answer").type("cy.get('.new-todo')")
    cy.get("button[type='submit']").click()
    cy.getBySel("next-lesson-button").should("be.not.visible")
    cy.getBySel("lesson-upcoming-1").should(
      "have.class",
      "bg-white border-2 border-gray-300"
    )
  })
})

export {}
