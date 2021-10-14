/* 
  Note: These tests rely upon local storage state from previous tests, 
  so make sure to run all of them at once, ie: don't use `it.only()`
*/
import learnJson from "../../learn.json"
const { _ } = Cypress
const sectionSlug = "cypress-fundamentals"
const lessons = learnJson[sectionSlug].lessons

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
    cy.visit(`/${sectionSlug}/${lessons[0].slug}`)
    cy.get("#answer-0").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.reload()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
  })

  it("the lesson page displays the complete lesson button when a lesson is completed and navigates to the homepage after the final lesson is completed", () => {
    cy.visit(`/${sectionSlug}/cypress-runs-in-the-browser`)

    cy.get("#answer-0").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should("eq", `/${sectionSlug}/command-chaining`)

    cy.get("#answer-3").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/understanding-the-asynchronous-nature-of-cypress`
    )

    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/waiting-and-retry-ability`
    )

    cy.get("#answer-0").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should("eq", `/${sectionSlug}/cypress-ui-overview`)

    cy.get("#answer-0").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/how-to-debug-failing-tests`
    )

    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/cypress-is-just-javascript`
    )

    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    cy.location("pathname").should("eq", "/")
  })

  it("all of the lesson steps, on the homepage, for the first completed course are filled and completed", () => {
    cy.visit("/")

    cy.getBySel("course-2").within(($course) => {
      _.each(lessons, (lesson, index) => {
        cy.getBySel(`lesson-complete-${index}`).should("exist")
      })
    })
  })

  it("all of the lesson cards on the section page have a status of 'Completed'", () => {
    cy.visit(`/${sectionSlug}`)

    cy.getBySel("section-steps").within(($course) => {
      _.each(lessons, (lesson, index) => {
        cy.getBySel(`lesson-complete-${index}`).should("exist")
      })
    })
  })
})

export {}
