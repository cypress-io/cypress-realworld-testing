import realWorldExamples from "../../data/real-world-examples.json"
const { _ } = Cypress

describe("RWE Landing Page", function () {
  beforeEach(function () {
    cy.visit("/real-world-examples")
  })

  it("renders all of the Real World Examples titles & lessons", function () {
    const rwaExamples = Object.keys(realWorldExamples)

    _.each(rwaExamples, (lesson, index) => {
      const title = realWorldExamples[lesson].title
      const lessons = realWorldExamples[lesson].lessons

      cy.getBySel(`real-world-example-${index}`).within(($lesson) => {
        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          cy.getBySel(`real-world-lesson-${index}`).contains(lessonTitle)
        })
      })
    })
  })

  context("RWE Lesson Page", () => {
    it("the links in the TOC link to the correct examples/lessons", () => {
      cy.visit("/real-world-examples/authentication-overview-and-setup")

      cy.getBySel("real-world-lesson-1").click()
      cy.location("pathname").should(
        "eq",
        "/real-world-examples/unauthenticated-users"
      )

      cy.getBySel("real-world-lesson-3").click()
      cy.location("pathname").should("eq", "/real-world-examples/invalid-users")

      cy.getBySel("real-world-lesson-4").click()
      cy.location("pathname").should(
        "eq",
        "/real-world-examples/sign-up-login-create-bank-account-and-logout"
      )
    })
  })
})

export {}
