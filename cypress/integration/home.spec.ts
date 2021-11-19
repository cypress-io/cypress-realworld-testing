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

      cy.getBySel(`course-${index}`).click()

      cy.getBySel("course-progress").within(() => {
        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          cy.getBySel(`lesson-${index}`).contains(lessonTitle)
        })
      })
    })
  })
})

export {}
