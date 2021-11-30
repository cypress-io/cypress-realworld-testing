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

      cy.getBySel(`real-world-example-${index}`).within(() => {
        cy.getBySel(`category-${index}-title`).contains(title)

        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          const lessonDescription = lessons[index].description

          cy.getBySel(`real-world-example-${index}-title`).contains(lessonTitle)
          cy.getBySel(`real-world-example-${index}-description`).contains(
            lessonDescription
          )
        })
      })
    })
  })
})

export {}
