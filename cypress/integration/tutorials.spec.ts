import tutorialsJson from "../../data/tutorials.json"
const { _ } = Cypress

describe("Tutorials Landing Page", function () {
  beforeEach(function () {
    cy.visit("/tutorials")
  })

  it("renders all of the tutorials lessons", function () {
    const tutorials = Object.keys(tutorialsJson)

    _.each(tutorials, (lesson, index) => {
      const lessons = tutorialsJson[lesson].lessons

      cy.getBySel(`tutorial-${index}`).within(() => {
        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          cy.getBySel(`tutorial-lesson-${index}`).contains(lessonTitle)
        })
      })
    })
  })
})

export {}
