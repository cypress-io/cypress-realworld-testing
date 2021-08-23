describe("Multiple Choice Challenge", () => {
  beforeEach(() => {
    // 1280 is the XL breakpoint for Tailwind
    cy.viewport(1280, 768)
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
  })

  it("gray's out and strikes through an incorrect answer", () => {
    cy.get("#answer-0").click()
    cy.get("label[for='answer-0']").should(
      "have.class",
      "line-through text-gray-300"
    )
  })

  it.only("it displays the next lesson button when an answer is correct and updates the progress sidebar", () => {
    cy.get("#answer-1").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
  })
})

export {}
