import learnJson from "../../data/courses.json"
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
})

export {}
