const { _ } = Cypress
import { isMobile } from "../support/utils"
import coursesJson from "../../data/courses.json"
const courses = Object.keys(coursesJson)

const verifyCourseLinks = (path) => {
  cy.visit(path)
  cy.location("pathname").should("eq", path)
  cy.getBySel("courses-dropdown").click()
  cy.get("[data-test=courses-dropdown-menu]").within(() => {
    _.each(courses, (course, index) => {
      const title: string = coursesJson[course].title
      cy.contains('a', title)
      .should('have.attr', 'href')
      .and('include', coursesJson[course].slug)
    })
  })
}

describe("Header & Navigatiion", function () {
  it("renders the correct courses in the Courses dropdown menu on Desktop", function () {
    if (!isMobile()) {
      verifyCourseLinks("/")
      verifyCourseLinks(
        "/real-world-examples/authentication-overview-and-setup"
      )
      verifyCourseLinks("/cypress-fundamentals/cypress-is-just-javascript")
    }
  })

  it("renders all the courses and lessons in Mobile menu", function () {
    if (isMobile()) {
      cy.visit("/")
      cy.get("[data-test=mobile-menu-button]").click()

      const courses = Object.keys(coursesJson)

      _.each(courses, (course, index) => {
        const lessons = coursesJson[course].lessons

        cy.get(`[data-test=course-${index}]`).each(() => {
          cy.get("[data-test=course-title]").contains(coursesJson[course].title)

          _.each(lessons, (lesson, index) => {
            const lessonTitle = lessons[index].title
            cy.get(`[data-test=lesson-${index}]`).contains(lessonTitle)
          })
        })
      })
    }
  })
})

export {}
