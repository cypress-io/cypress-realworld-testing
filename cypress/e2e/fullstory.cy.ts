// fs.js is blocked (cypress.config.ts → blockHosts), so each test stubs window.FS
// before the page loads. The snippet backs off when FS already exists, so the stub
// sees every call the site makes. `capturing` stands in for the consent gate's
// flag: true is a visitor who accepted Analytics cookies.
const stubFullStory = (win, { capturing = true } = {}) => {
  const fs = cy.stub().as("FS")
  win.FS = fs
  win.__fullStoryCapturing = capturing
  return fs
}

const eventNames = (calls) =>
  calls
    .filter((args) => args[0] === "trackEvent" || args[0] === "trackEventAsync")
    .map((args) => args[1].name)

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
    // A correct answer completes the lesson, with no Complete button involved.
    cy.get("@FS").should("have.been.calledWithMatch", "trackEventAsync", {
      name: "Lesson Completed",
      properties: { lessonId: "testing-foundations/testing-is-a-mindset" },
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

  it("doesn't hold the navigation without consent", () => {
    cy.visit("/testing-your-first-application/app-install-and-overview", {
      onBeforeLoad(win) {
        // A stalled FullStory would hold the click for the full cap.
        stubFullStory(win, { capturing: false })
          .withArgs("trackEventAsync")
          .returns(new Promise(() => {}))
      },
    })
    cy.getBySel("complete-lesson-button").find("a").click()
    cy.location("pathname", { timeout: 400 }).should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-your-first-test"
    )
    cy.get("@FS").should("not.have.been.calledWith", "trackEventAsync")
  })

  it("sends Course Completed once, for the lesson that finished the course", () => {
    const calls = []
    cy.on("window:before:load", (win: any) => {
      win.__fullStoryCapturing = true
      win.FS = (...args) => calls.push(args)
    })
    cy.visit("/testing-your-first-application/app-install-and-overview")
    // Click through every lesson. The last one's button goes home.
    const next = () =>
      cy.location("pathname").then((path) => {
        if (path === "/") return
        cy.getBySel("complete-lesson-button").find("a").click()
        cy.location("pathname").should("not.eq", path)
        next()
      })
    next()
    // Coming back must not send it again: the restored progress isn't a new completion.
    cy.visit("/testing-your-first-application")
    cy.reload()
    cy.wrap(calls).should(() => {
      const names = eventNames(calls)
      expect(names.filter((n) => n === "Lesson Completed")).to.have.length(5)
      expect(names.filter((n) => n === "Course Completed")).to.have.length(1)
      const course = calls.find((args) => args[1]?.name === "Course Completed")
      expect(course[1].properties).to.deep.eq({
        courseSlug: "testing-your-first-application",
      })
    })
  })

  it("sends Site Search Performed once typing settles, without the query", () => {
    cy.intercept("POST", "**/1/indexes/*/queries*", {
      body: {
        results: [
          {
            hits: [],
            nbHits: 7,
            page: 0,
            nbPages: 0,
            hitsPerPage: 20,
            processingTimeMS: 1,
            query: "",
            params: "",
          },
        ],
      },
    })
    cy.visit("/", { onBeforeLoad: stubFullStory })
    cy.get(".DocSearch-Button").click()
    cy.get(".DocSearch-Input").type("intercept")
    cy.get("@FS").should("have.been.calledWithMatch", "trackEvent", {
      name: "Site Search Performed",
      properties: { index: "real_world_testing", resultCount: 7 },
    })
    cy.get("@FS")
      .invoke("getCalls")
      .then((stubCalls) => {
        const all = stubCalls.map((call) => call.args)
        const searches = eventNames(all).filter(
          (n) => n === "Site Search Performed"
        )
        expect(searches).to.have.length(1)
        expect(JSON.stringify(all)).not.to.contain("intercept")
      })
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

  it("loads the YouTube player API only after consent", () => {
    const listeners = {}
    cy.visit("/testing-your-first-application/app-install-and-overview", {
      onBeforeLoad(win: any) {
        stubFullStory(win, { capturing: false })
        win.Osano = {
          cm: { addEventListener: (name, fn) => (listeners[name] = fn) },
        }
        win.__players = []
        win.YT = {
          Player: function () {
            win.__players.push(this)
          },
        }
      },
    })
    cy.get('iframe[src*="youtube-nocookie.com/embed/"]').should("exist")
    cy.wait(300)
    cy.window().its("__players").should("have.length", 0)
    cy.window().then((win: any) => {
      win.__fullStoryCapturing = true
      listeners["osano-cm-consent-saved"]()
    })
    cy.window().its("__players").should("have.length", 1)
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
