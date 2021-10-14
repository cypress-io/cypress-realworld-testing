import realWorldExamples from "../../real-world-examples.json"
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

  context("Example Progress Sidebar", () => {
    it.only("the examples in the progress sidebar link to the correct examples", () => {
      cy.visit("/real-world-examples/authentication-overview-and-setup")

      cy.getBySel("lesson-progress-link-1").click()
      cy.location("pathname").should(
        "eq",
        "/real-world-examples/unauthenticated-users"
      )

      cy.getBySel("lesson-progress-link-3").click()
      cy.location("pathname").should("eq", "/real-world-examples/invalid-users")

      cy.getBySel("lesson-progress-link-4").click()
      cy.location("pathname").should(
        "eq",
        "/real-world-examples/sign-up-login-create-bank-account-and-logout"
      )
    })
  })
})

export {}
