import realWorldExamples from "../../data/real-world-examples.json"
const { _ } = Cypress

describe("RWE Landing Page", function () {
  beforeEach(function () {
    cy.visit("/real-world-examples")
  })

  it("renders all of the Real World Examples titles & lessons", function () {
    const rwaExamples = Object.keys(realWorldExamples)

    _.each(rwaExamples, (example) => {
      console.log(example)
      const title = realWorldExamples[example].title
      const lessons = realWorldExamples[example].lessons

      cy.getBySel(`real-world-example-${example}`).within(() => {
        cy.getBySel(`${example}-title`).contains(title)

        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          const lessonDescription = lessons[index].description

          cy.getBySel(`${example}-${index}-title`).contains(lessonTitle)
          cy.getBySel(`${example}-${index}-description`).contains(
            lessonDescription
          )
        })
      })
    })
  })
})

export {}
