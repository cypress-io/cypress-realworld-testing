/* 
  Note: These tests rely upon local storage state from previous tests, 
  so make sure to run all of them at once, ie: don't use `it.only()`
*/
import learnJson from "../../learn.json"
const { _ } = Cypress

describe("Progress State & Local Storage", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.restoreLocalStorage()
  })

  afterEach(() => {
    // @ts-ignore
    cy.saveLocalStorage()
  })

  it("the progress state on the lesson page is preserved upon refresh", () => {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
    cy.get("#answer-1").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.reload()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
  })

  it("the lesson page displays the complete section button when a section is completed and navigates to the homepage", () => {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    // Installing Cypress and Writing Our First Test
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )
    cy.get("#answer").type("cy.get('.new-todo').should('exist')")
    cy.getBySel("free-form-submit").click()
    cy.getBySel("lesson-complete-1").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    // Multiple Todo's and Before Each
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/multiple-todos-and-before-each"
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    // How to Use Cypress Commands
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-use-cypress-commands"
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    // Cypress Log, Snapshot & Aliases
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/cypress-log-snapshot-and-aliases"
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    // Negative Tests
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/negative-tests"
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").contains("Complete Section")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should("eq", "/")
  })

  it("all of the lesson steps, on the homepage, for the first completed course are filled and completed", () => {
    cy.visit("/")
    const lessons = learnJson["testing-your-first-application"].lessons
    console.table(lessons)

    cy.getBySel("course-0").within(($course) => {
      _.each(lessons, (lesson, index) => {
        cy.getBySel(`lesson-complete-${index}`).should("exist")
      })
    })
  })

  it("all of the lesson cards on the section page have a status of 'Completed'", () => {
    cy.visit("/testing-your-first-application")
    const lessons = learnJson["testing-your-first-application"].lessons

    cy.getBySel("section-steps").within(($course) => {
      _.each(lessons, (lesson, index) => {
        cy.getBySel(`lesson-complete-${index}`).should("exist")
      })
    })
  })
})

export {}
