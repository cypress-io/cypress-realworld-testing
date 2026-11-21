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

  it("sends video events from the YouTube player", () => {
    cy.visit("/testing-your-first-application/app-install-and-overview", {
      onBeforeLoad(win) {
        stubFullStory(win)
        // A fake IFrame Player API, so no script loads from youtube.com.
        const players = []
        ;(win as any).__players = players
        ;(win as any).YT = {
          Player: function (iframe, { events }) {
            const player = {
              time: 0,
              getCurrentTime: () => player.time,
              getDuration: () => 100,
              emit: (data) => events.onStateChange({ data }),
            }
            players.push(player)
            return player
          },
        }
      },
    })
    cy.get('iframe[src*="youtube-nocookie.com/embed/"]').should("exist")
    cy.window()
      .its("__players.0")
      .then((player: any) => {
        player.emit(1) // playing
        player.time = 60
        player.emit(2) // paused
        player.emit(1)
        player.time = 100
        player.emit(0) // ended
      })
    const video = (name, properties = {}) =>
      cy.get("@FS").should("have.been.calledWithMatch", "trackEvent", {
        name,
        properties,
      })
    video("Video Started", {
      pagePath: "/testing-your-first-application/app-install-and-overview",
    })
    video("Video Progressed", { percent: 50 })
    video("Video Progressed", { percent: 75 })
    video("Video Completed")
    cy.get("@FS")
      .invoke("getCalls")
      .then((calls) => {
        const names = calls
          .filter((call) => call.args[0] === "trackEvent")
          .map((call) => call.args[1].name)
        expect(names.filter((n) => n === "Video Started")).to.have.length(1)
      })
  })

  it("sends Challenges Disabled and Challenges Enabled", () => {
    cy.visit("/testing-foundations/testing-is-a-mindset", {
      onBeforeLoad: stubFullStory,
    })
    cy.getBySel("skip-challenge-input").check()
    cy.get("@FS").should("have.been.calledWithMatch", "trackEvent", {
      name: "Challenges Disabled",
    })
    cy.getBySel("skip-challenge-input").uncheck()
    cy.get("@FS").should("have.been.calledWithMatch", "trackEvent", {
      name: "Challenges Enabled",
    })
  })

  it("labels links toward the docs and the main calls to action", () => {
    cy.visit("/advanced-cypress-concepts/intercepting-network-requests")
    cy.get('a[data-fs-element="Learn Content - API Docs Link"]')
      .first()
      .should("have.attr", "data-api-name")
    cy.get('a[href^="https://docs.cypress.io"]:not([data-api-name])')
      .first()
      .should("have.attr", "data-fs-element", "Learn Content - Docs Link")
    cy.get('[data-fs-element="Learn Header - Logo"]').should("exist")
    cy.visit("/")
    cy.get('[data-fs-element="Learn Home - Hero - Start Learning"]').should(
      "exist"
    )
    cy.get('[data-fs-element="Learn Home - Course Card"]')
      .first()
      .should("have.attr", "data-course-slug")
  })
})
