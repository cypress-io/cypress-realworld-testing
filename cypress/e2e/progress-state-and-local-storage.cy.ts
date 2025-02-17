/*
  Note: These tests rely upon local storage state from previous tests,
  so make sure to run all of them at once and in order
*/
import { isMobile } from "../support/utils"
import coursesJson from "../../data/courses.json"
const { _ } = Cypress
const sectionSlug = "cypress-fundamentals"
const lessons = coursesJson[sectionSlug].lessons

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
    cy.get("#answer-2").click()
    cy.get("[data-test=next-lesson-button]").should("be.visible")
    cy.reload()
    cy.get("[data-test=next-lesson-button]").should("be.visible")
  })

  it("the lesson page displays the complete lesson button when a lesson is completed and navigates to the homepage after the final lesson is completed", () => {
    cy.visit(`/${sectionSlug}/${coursesJson[sectionSlug].lessons[0].slug}`)

    _.each(lessons, (lesson, index) => {
      cy.location("pathname").should(
        "eq",
        `/${sectionSlug}/${coursesJson[sectionSlug].lessons[index].slug}`
      )
      cy.getBySel(
        `"challenge-answer-${lesson["challenges"][0]["correctAnswerIndex"]}"`
      ).click()
      cy.getBySel("next-lesson-button").click()
    })

    cy.location("pathname").should("eq", "/")
  })

  it("all of the lesson steps, on the homepage, for the first completed course are filled and completed", () => {
    cy.visit("/")

    if (isMobile()) {
      cy.getBySel(`mobile-course-2`).click()
    } else {
      cy.getBySel(`course-2`).click()
    }

    cy.getBySel("course-progress").each(() => {
      _.each(lessons, (lesson, index) => {
        cy.getBySel(`lesson-complete-${index}`).should("exist")
      })
    })
  })

  it("all of the lesson cards on the course page have a status of 'Completed'", () => {
    cy.visit(`/${sectionSlug}`)

    cy.getBySel("course-steps").within(($course) => {
      _.each(lessons, (lesson, index) => {
        cy.getBySel(`lesson-complete-${index}`).should("exist")
      })
    })
  })
})

export {}
