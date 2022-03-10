import coursesJson from "../../data/courses.json"
import rweJson from "../../data/real-world-examples.json"

describe("SEO titles and descriptions", function () {
  it("renders twitter card meta tags", function () {
    cy.visit("/")

    cy.get('head meta[name="twitter:title"]').should(
      "have.attr",
      "content",
      "Real World Testing with Cypress"
    )

    cy.get('head meta[name="twitter:description"]').should(
      "have.attr",
      "content",
      "Real World Testing with Cypress is a four-course curriculum that teaches everything you need to know about testing modern web applications with Cypress"
    )

    cy.get('head meta[name="twitter:image"]').should(
      "have.attr",
      "content",
      "/images/social/twitter-card.png"
    )
  })
  it("The homepage has the correct meta title and description", function () {
    cy.visit("/")

    cy.title().should("eq", "Real World Testing with Cypress")

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Real World Testing with Cypress is a four-course curriculum that teaches everything you need to know about testing modern web applications with Cypress"
    )
  })

  it("The course pages have the correct meta title and description", function () {
    cy.visit("/cypress-fundamentals")

    const title = coursesJson["cypress-fundamentals"].title
    const description = coursesJson["cypress-fundamentals"].description

    cy.title().should("eq", `${title} | Real World Testing with Cypress`)

    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      `${description}`
    )
  })

  it("The lesson pages have the correct meta title and description", function () {
    cy.visit("/testing-foundations/testing-is-a-mindset")

    const title = coursesJson["testing-foundations"].lessons[0].title
    const description =
      coursesJson["testing-foundations"].lessons[0].description

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
