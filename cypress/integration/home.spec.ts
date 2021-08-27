import learnJson from "../../learn.json"
import realWorldExamples from "../../real-world-examples.json"
const { _ } = Cypress

describe("RWT Home", function () {
  beforeEach(function () {
    cy.visit("/")
  })

  it("renders all of the course titles, descriptions & lessons", function () {
    const courses = Object.keys(learnJson)

    _.each(courses, (course, index) => {
      const title = learnJson[course].title
      const description = learnJson[course].description
      const lessons = learnJson[course].lessons

      cy.getBySel(`course-${index}`).within(($course) => {
        cy.getBySel("course-title").contains(title)
        cy.getBySel("course-description").contains(description)

        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          cy.getBySel(`lesson-${index}`).contains(lessonTitle)
        })
      })
    })
  })

  it("renders all of the Real World Examples titles & lessons", function () {
    const rwaExamples = Object.keys(realWorldExamples)

    _.each(rwaExamples, (lesson, index) => {
      const title = realWorldExamples[lesson].title
      const lessons = realWorldExamples[lesson].lessons

      cy.getBySel(`real-world-example-${index}`).within(($lesson) => {
        cy.getBySel("real-world-title").contains(title)

        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          cy.getBySel(`real-world-lesson-${index}`).contains(lessonTitle)
        })
      })
    })
  })
})

export {}
