/* 
  Note: These tests rely upon local storage state from previous tests, 
  so make sure to run all of them at once, ie: don't use `it.only()`
*/
import learnJson from "../../learn.json"
const { _ } = Cypress
const sections = Object.keys(learnJson)
const sectionSlug = "testing-your-first-application"
const lessons = learnJson[sectionSlug].lessons

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

  it.only("says 'Course Completed' and links to the home page if all of the lessons have been completed", () => {
    cy.visit(`/${sectionSlug}/${learnJson[sectionSlug].lessons[0].slug}`)

    _.each(lessons, (lesson, index) => {
      cy.location("pathname").should(
        "eq",
        `/${sectionSlug}/${learnJson[sectionSlug].lessons[index].slug}`
      )
      cy.get("#answer-1").click()
      cy.getBySel("lesson-complete-0").should("have.class", "bg-indigo-600")
      cy.getBySel("next-lesson-button").click()
    })

    cy.visit("/testing-your-first-application")

    cy.getBySel("next-lesson-button").then(($btn) => {
      // @ts-ignore
      const text = $btn.text()
      // @ts-ignore
      const href = $btn.attr("href")

      expect(text).to.eq("Course Completed")
      expect(href).to.eq("/")

      cy.wrap($btn).click()
    })

    cy.location("pathname").should("eq", "/")
  })
})

export {}
