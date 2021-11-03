const { _ } = Cypress
import learnJson from "../../data/courses.json"
const courses = Object.keys(learnJson)

const verifyCourseLinks = (path) => {
  cy.visit(path)
  cy.getBySel("courses-dropdown").click()
  cy.getBySel("courses-dropdown-menu").within(() => {
    _.each(courses, (course, index) => {
      const title = learnJson[course].title
      cy.get("a").its(index).contains(title)
    })
  })
}

describe("Header & Navigatiion", function () {
  it("renders the correct courses in the Courses dropdown menu", function () {
    verifyCourseLinks("/")
    verifyCourseLinks("/real-world-examples/authentication-overview-and-setup")
    verifyCourseLinks("/cypress-fundamentals/cypress-is-just-javascript")
  })
})

export {}
