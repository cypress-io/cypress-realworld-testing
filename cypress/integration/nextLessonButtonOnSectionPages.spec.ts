/* 
  Note: These tests rely upon local storage state from previous tests, 
  so make sure to run all of them at once, ie: don't use `it.only()`
*/
import learnJson from "../../learn.json"
const { _ } = Cypress
const sections = Object.keys(learnJson)

describe("Next Lesson Button on Section Pages", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.restoreLocalStorage()
  })

  afterEach(() => {
    // @ts-ignore
    cy.saveLocalStorage()
  })

  it("says 'Start Course' and links to the first lesson if none of the lessons have been completed", () => {
    cy.visit("/testing-your-first-application")
    cy.getBySel("next-lesson-button").then(($btn) => {
      // @ts-ignore
      const text = $btn.text()
      // @ts-ignore
      const href = $btn.attr("href")

      expect(text).to.eq("Start Course")
      expect(href).to.eq(
        `/testing-your-first-application/${learnJson["testing-your-first-application"].lessons[0].slug}`
      )
    })
  })

  it("says 'Next Lesson' and links to the 2nd lesson if the first lesson has been completed", () => {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
    cy.get("#answer-1").click()
    cy.visit("/testing-your-first-application")

    cy.getBySel("next-lesson-button").then(($btn) => {
      // @ts-ignore
      const text = $btn.text()
      // @ts-ignore
      const href = $btn.attr("href")

      expect(text).to.eq("Next Lesson")
      expect(href).to.eq(
        `/testing-your-first-application/${learnJson["testing-your-first-application"].lessons[1].slug}`
      )
    })
  })

  it("says 'Course Completed' and links to the home page if all of the lessons have been completed", () => {
    cy.visit("/testing-your-first-application/todomvc-app-install-and-overview")
    cy.get("#answer-1").click()
    cy.getBySel("next-lesson-button").click()

    // Installing Cypress and Writing Our First Test
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )
    cy.get("#answer").type("cy.get('.new-todo').should('exist')")
    cy.getBySel("free-form-submit").click()
    cy.getBySel("next-lesson-button").click()

    // Multiple Todo's and Before Each
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/multiple-todos-and-before-each"
    )
    cy.get("#answer-1").click()
    cy.getBySel("next-lesson-button").click()

    // How to Use Cypress Commands
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-use-cypress-commands"
    )
    cy.get("#answer-1").click()
    cy.getBySel("next-lesson-button").click()

    // Cypress Log, Snapshot & Aliases
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/cypress-log-snapshot-and-aliases"
    )
    cy.get("#answer-1").click()
    cy.getBySel("next-lesson-button").click()

    // Negative Tests
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/negative-tests"
    )
    cy.get("#answer-1").click()

    cy.visit("/testing-your-first-application")

    cy.getBySel("next-lesson-button").then(($btn) => {
      // @ts-ignore
      const text = $btn.text()
      // @ts-ignore
      const href = $btn.attr("href")

      expect(text).to.eq("Course Completed")
      expect(href).to.eq("/")
    })
  })
})

export {}
