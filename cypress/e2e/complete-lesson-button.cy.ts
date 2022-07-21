describe("Complete Lesson Button", () => {
  it("Links to the correct lesson when clicked", () => {
    cy.visit("/testing-your-first-application/app-install-and-overview")
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-your-first-test"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-test-forms-and-custom-cypress-commands"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-test-multiple-pages"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-test-user-journeys"
    )
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist").click()

    cy.location("pathname").should("eq", "/")
  })

  it("only shows on 'testing your first application' lesson pages", () => {
    cy.visit("/testing-your-first-application/app-install-and-overview")
    cy.getBySel("next-lesson-button").should("not.exist")
    cy.getBySel("complete-lesson-button").should("exist")

    cy.visit("/testing-foundations/testing-is-a-mindset")
    cy.getBySel("complete-lesson-button").should("not.exist")

    cy.visit("/cypress-fundamentals/command-chaining")
    cy.getBySel("complete-lesson-button").should("not.exist")

    cy.visit("/advanced-cypress-concepts/intercepting-network-requests")
    cy.getBySel("complete-lesson-button").should("not.exist")
  })
})

export {}
