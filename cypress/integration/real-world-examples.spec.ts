import realWorldExamples from "../../real-world-examples.json"
const { _ } = Cypress

describe("RWT Home", function () {
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
})

export {}
