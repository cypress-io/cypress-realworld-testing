/* 
  Note: These tests rely upon local storage state from previous tests, 
  so make sure to run all of them at once, ie: don't use `it.only()`
*/
import learnJson from "../../learn.json"
const { _ } = Cypress
const sectionSlug = "testing-your-first-application"
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
    cy.get("#answer-1").click()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.reload()
    cy.getBySel("next-lesson-button").should("be.visible")
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
  })

  it("the lesson page displays the complete section button when a section is completed and navigates to the homepage", () => {
    cy.visit(`/${sectionSlug}/${learnJson[sectionSlug].lessons[0].slug}`)
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/${learnJson[sectionSlug].lessons[1].slug}`
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/${learnJson[sectionSlug].lessons[2].slug}`
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/${learnJson[sectionSlug].lessons[3].slug}`
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/${learnJson[sectionSlug].lessons[4].slug}`
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").click()

    cy.location("pathname").should(
      "eq",
      `/${sectionSlug}/${learnJson[sectionSlug].lessons[5].slug}`
    )
    cy.get("#answer-1").click()
    cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
    cy.getBySel("next-lesson-button").contains("Complete Section")
    cy.getBySel("next-lesson-button").click()
    cy.location("pathname").should("eq", "/")
  })

  it("all of the lesson steps, on the homepage, for the first completed course are filled and completed", () => {
    cy.visit("/")

    cy.getBySel("course-0").within(($course) => {
      _.each(lessons, (lesson, index) => {
        cy.getBySel(`lesson-complete-${index}`).should("exist")
      })
    })
  })

  it("all of the lesson cards on the section page have a status of 'Completed'", () => {
    cy.visit("/testing-your-first-application")

    cy.getBySel("section-steps").within(($course) => {
      _.each(lessons, (lesson, index) => {
        cy.getBySel(`lesson-complete-${index}`).should("exist")
      })
    })
  })
})

export {}
