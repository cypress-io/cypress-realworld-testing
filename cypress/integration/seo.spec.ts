import learnJson from "../../data/courses.json"
import rweJson from "../../data/real-world-examples.json"

describe("SEO titles and descriptions", function () {
  it("The homepage has the correct meta title and description", function () {
    cy.visit("/")

    cy.title().should("eq", "Real World Testing with Cypress")

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Learn from top industry experts and level-up your testing knowledge - for free."
    )
  })

  it("The course section pages have the correct meta title and description", function () {
    cy.visit("/cypress-fundamentals")

    const title = learnJson["cypress-fundamentals"].title
    const description = learnJson["cypress-fundamentals"].description

    cy.title().should("eq", `${title} | Real World Testing with Cypress`)

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      `${description}`
    )
  })

  it("The lesson pages have the correct meta title and description", function () {
    cy.visit("/testing-foundations/testing-is-a-mindset")

    const title = learnJson["testing-foundations"].lessons[0].title
    const description = learnJson["testing-foundations"].lessons[0].description

    cy.title().should("eq", `${title} | Real World Testing with Cypress`)

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      `${description}`
    )
  })

  it("The Real World Example page has the correct meta title and description", function () {
    cy.visit("/real-world-examples")

    cy.title().should(
      "eq",
      "Real World Examples | Real World Testing with Cypress"
    )

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Test examples from a payment application that demonstrate real-world usage of Cypress testing methods, patterns, and workflows."
    )
  })

  it("The real world example pages have the correct meta title and description", function () {
    cy.visit("/real-world-examples/unauthenticated-users")

    const title = rweJson["authentication"].lessons[1].title
    const description = rweJson["authentication"].lessons[1].description

    cy.title().should("eq", `${title} | Real World Testing with Cypress`)

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      `${description}`
    )
  })
})

export {}
