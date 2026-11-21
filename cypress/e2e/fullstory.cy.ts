// fs.js is blocked (cypress.config.ts → blockHosts), so each test stubs window.FS
// before the page loads. The snippet backs off when FS already exists, so the stub
// sees every call the site makes.
const stubFullStory = (win) => {
  const fs = cy.stub().as("FS")
  win.FS = fs
  return fs
}

const lesson = "/cypress-fundamentals/how-to-write-a-test"

describe("FullStory", () => {
  it("sends page properties for a lesson", () => {
    cy.visit(lesson, { onBeforeLoad: stubFullStory })
    cy.get("@FS").should("have.been.calledWithMatch", "setProperties", {
      type: "page",
      properties: {
        pageType: "learn",
        product: "app",
        section: "lesson",
        courseSlug: "cypress-fundamentals",
      },
    })
    cy.get("@FS")
      .invoke("getCalls")
      .then((calls) => {
        const page = calls.find((call) => call.args[0] === "setProperties")
        expect(page.args[1].properties.pageName).to.match(/^Lesson: /)
        expect(page.args[1].properties.pageName).not.to.contain(" | ")
      })
  })

  it("sends Code Block Copied after the clipboard write", () => {
    cy.visit(lesson, {
      onBeforeLoad(win) {
        stubFullStory(win)
        cy.stub(win.navigator.clipboard, "writeText").resolves()
      },
    })
    cy.get("pre").first().parent().trigger("mouseover")
    cy.get('[aria-label="Copy code"]').first().click()
    cy.get("@FS").should("have.been.calledWithMatch", "trackEvent", {
      name: "Code Block Copied",
      properties: { pagePath: lesson },
    })
  })

  it("sends Challenge Answered once per answer", () => {
    cy.visit("/testing-foundations/testing-is-a-mindset", {
      onBeforeLoad: stubFullStory,
    })
    cy.get("#answer-0").click()
    cy.get("@FS").should("have.been.calledWithMatch", "trackEvent", {
      name: "Challenge Answered",
      properties: {
        lessonId: "testing-foundations/testing-is-a-mindset",
        isCorrect: false,
        attemptNumber: 1,
      },
    })
    cy.get("#answer-1").click()
    cy.get("@FS").should("have.been.calledWithMatch", "trackEvent", {
      name: "Challenge Answered",
      properties: { isCorrect: true, attemptNumber: 2 },
    })
  })

  it("sends Lesson Completed, then navigates", () => {
    cy.visit("/testing-your-first-application/app-install-and-overview", {
      onBeforeLoad(win) {
        // FullStory never confirms, so the page waits out the 500ms cap.
        stubFullStory(win)
          .withArgs("trackEventAsync")
          .returns(new Promise(() => {}))
      },
    })
    cy.getBySel("complete-lesson-button").find("a").click()
    cy.get("@FS").should("have.been.calledWithMatch", "trackEventAsync", {
      name: "Lesson Completed",
      properties: {
        lessonId: "testing-your-first-application/app-install-and-overview",
      },
    })
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-your-first-test"
    )
  })

  it("masks what people type in search", () => {
    cy.visit("/")
    cy.get(".DocSearch-Button").click()
    cy.get(".DocSearch-Input").should("have.class", "fs-mask")
  })
})
