import { isMobile } from "../support/utils"
import coursesJson from "../../data/courses.json"
const { _ } = Cypress

describe("RWT Home", function () {
  beforeEach(function () {
    cy.visit("/")
  })

  it("the course selector renders the correct lessons for each course", function () {
    const courses = Object.keys(coursesJson)

    _.each(courses, (course, index) => {
      const lessons = coursesJson[course].lessons

      if (isMobile()) {
        cy.get(`[data-test=mobile-course-${index}]`).click()
      } else {
        cy.get(`[data-test=course-${index}]`).click()
      }

      cy.get("[data-test=course-progress]").each(() => {
        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          cy.get(`[data-test=lesson-${index}]`).contains(lessonTitle)
        })
      })
    })
  })
})

export {}
