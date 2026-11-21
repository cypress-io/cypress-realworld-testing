import { expect } from "chai"
import vm from "vm"
import {
  PAGE_NAME_MAX,
  contentLinkLabel,
  createSearchTracker,
  createVideoTracker,
  fsLabel,
  trackFullStoryEventBeforeNavigating,
  pageProperties,
} from "../utils/fullstory"
import { courseCompletedBy, lessonCompletedBy } from "../utils/machineUtils"
import coursesJson from "../data/courses.json"
import {
  fullStoryConsentGate,
  fullStorySnippet,
} from "../utils/fullstorySnippet"

describe("FullStory page properties", () => {
  it("names fixed pages by their label", () => {
    expect(pageProperties("/", "/", "Learn E2E Testing | Cypress")).to.deep.eq({
      pageName: "Home",
      pageType: "learn",
      product: "app",
      section: "home",
    })
    expect(pageProperties("/tutorials", "/tutorials", "x").pageName).to.eq(
      "Tutorials"
    )
  })

  it("prefixes templated pages and drops the title suffix", () => {
    expect(
      pageProperties(
        "/[course]",
        "/cypress-fundamentals",
        "Cypress Fundamentals | Cypress Testing Tools"
      )
    ).to.include({
      pageName: "Course: Cypress Fundamentals",
      section: "course",
    })
    expect(
      pageProperties(
        "/tutorials/[slug]",
        "/tutorials/foo",
        "Foo | Real World Testing with Cypress"
      ).pageName
    ).to.eq("Tutorial: Foo")
  })

  it("adds the course slug to lessons", () => {
    expect(
      pageProperties(
        "/[course]/[slug]",
        "/cypress-fundamentals/how-to-write-a-test",
        "How to Write a Test | Cypress Testing Tools"
      )
    ).to.deep.eq({
      pageName: "Lesson: How to Write a Test",
      pageType: "learn",
      product: "app",
      section: "lesson",
      courseSlug: "cypress-fundamentals",
    })
  })

  it("puts unknown routes in other and fits the name limit", () => {
    const props = pageProperties("/404", "/missing", "x".repeat(300))
    expect(props.section).to.eq("other")
    expect(props.pageName.length).to.eq(PAGE_NAME_MAX)
  })
})

// Runs the inline <head> scripts against a fake window, as the browser would.
function runHead(osanoConsent?: { ANALYTICS: string }) {
  const calls: string[] = []
  const listeners: Record<string, (consent: unknown) => void> = {}
  const script = { parentNode: { insertBefore: () => {} } }
  const window: any = {
    Osano: osanoConsent && {
      cm: {
        addEventListener: (name, fn) => (listeners[name] = fn),
        getConsent: () => osanoConsent,
      },
    },
  }
  const document = {
    createElement: () => ({ setAttribute: () => {} }),
    getElementsByTagName: () => [script],
    head: { appendChild: () => {} },
  }
  vm.runInNewContext(fullStorySnippet("o-TEST-na1"), { window, document })
  // Record every API call that reaches the snippet's queue.
  const queue = window.FS.q
  queue.push = (args) => calls.push(args[0])
  vm.runInNewContext(fullStoryConsentGate, { window })
  return {
    calls,
    capturing: () => window.__fullStoryCapturing,
    save: (consent) => listeners["osano-cm-consent-saved"](consent),
  }
}

describe("FullStory consent gate", () => {
  it("never starts capture without Osano", () => {
    expect(runHead().calls).not.to.include("start")
  })

  it("waits for Analytics consent", () => {
    const head = runHead({ ANALYTICS: "DENY" })
    expect(head.calls).not.to.include("start")
    expect(head.capturing()).to.eq(false)
    head.save({ ANALYTICS: "ACCEPT" })
    expect(head.calls).to.include("start")
    expect(head.capturing()).to.eq(true)
  })

  it("shuts down and restarts as consent changes", () => {
    const head = runHead({ ANALYTICS: "ACCEPT" })
    head.save({ ANALYTICS: "DENY" })
    expect(head.capturing()).to.eq(false)
    head.save({ ANALYTICS: "ACCEPT" })
    expect(head.capturing()).to.eq(true)
    expect(head.calls.slice(-3)).to.deep.eq(["start", "shutdown", "restart"])
  })
})

// trackFullStoryEvent reads window.FS, so these give Node a window that records calls.
function withFullStory(
  test: (events: any[]) => void | Promise<void>,
  capturing = true
) {
  return async () => {
    const events: any[] = []
    const g = global as any
    g.window = {
      FS: (method, options) => {
        if (method === "trackEvent") events.push(options)
        // Like FullStory before capture starts, the async call never settles.
        if (method === "trackEventAsync") return new Promise(() => {})
      },
      __fullStoryCapturing: capturing,
      location: { pathname: "/course/lesson" },
      addEventListener: () => {},
    }
    try {
      await test(events)
    } finally {
      delete g.window
    }
  }
}

describe("FullStory labels", () => {
  it("declares label properties in the schema", () => {
    expect(
      fsLabel("Learn Home - Course Card", { "course-slug": "x" })
    ).to.deep.eq({
      "data-fs-element": "Learn Home - Course Card",
      "data-course-slug": "x",
      "data-fs-properties-schema": '{"data-course-slug":"str"}',
    })
    expect(fsLabel("Learn Header - Logo")).to.deep.eq({
      "data-fs-element": "Learn Header - Logo",
    })
  })

  it("labels only links toward Cypress sites", () => {
    expect(contentLinkLabel("https://docs.cypress.io/api/commands/get")).to.eq(
      "Learn Content - Docs Link"
    )
    expect(contentLinkLabel("https://on.cypress.io/chat")).to.eq(
      "Learn Content - Docs Link"
    )
    expect(contentLinkLabel("https://www.cypress.io/cloud")).to.eq(
      "Learn Content - Cypress.io Link"
    )
    expect(contentLinkLabel("https://github.com/cypress-io")).to.eq(undefined)
    expect(contentLinkLabel("/cypress-fundamentals")).to.eq(undefined)
    expect(contentLinkLabel("#heading")).to.eq(undefined)
  })
})

describe("FullStory video tracker", () => {
  it(
    "sends each event at most once",
    withFullStory((events) => {
      const video = createVideoTracker("abc")
      video.progressed(50, 100) // before play: nothing
      video.played()
      video.played()
      video.progressed(30, 100)
      video.progressed(80, 100) // a seek past 50 and 75
      video.progressed(90, 100)
      video.ended()
      video.ended()
      expect(events.map((e) => [e.name, e.properties.percent])).to.deep.eq([
        ["Video Started", undefined],
        ["Video Progressed", 25],
        ["Video Progressed", 50],
        ["Video Progressed", 75],
        ["Video Completed", undefined],
      ])
      expect(events[0].properties).to.deep.eq({
        videoId: "abc",
        pagePath: "/course/lesson",
      })
    })
  )
})

describe("FullStory search tracker", () => {
  const settle = () => new Promise((resolve) => setTimeout(resolve, 20))

  it(
    "sends one event per settled query and skips repeats",
    withFullStory(async (events) => {
      const search = createSearchTracker(10)
      search.onResults("c", 40)
      search.onResults("cy.get", 3)
      await settle()
      search.onResults("cy.get ", 3) // same query
      await settle()
      search.onResults("   ", 0) // empty
      search.onResults("intercept", 0)
      search.flush() // leaving the page sends it at once
      expect(events).to.deep.eq([
        {
          name: "Site Search Performed",
          properties: { index: "real_world_testing", resultCount: 3 },
        },
        {
          name: "Site Search Performed",
          properties: { index: "real_world_testing", resultCount: 0 },
        },
      ])
    })
  )
})

describe("Course completion", () => {
  const course = "testing-your-first-application"
  const all = coursesJson[course].lessons.map((lesson) => ({
    id: `${course}/${lesson.slug}`,
    status: "completed",
  }))
  const last = all[all.length - 1].id

  it("names the course the last lesson finished", () => {
    expect(courseCompletedBy(coursesJson, last, all.slice(0, -1), all)).to.eq(
      course
    )
  })

  it("ignores an already-finished course and an unfinished one", () => {
    expect(courseCompletedBy(coursesJson, last, all, [...all, all[0]])).to.eq(
      undefined
    )
    expect(courseCompletedBy(coursesJson, last, [], all.slice(0, -1))).to.eq(
      undefined
    )
  })
})

describe("FullStory before navigating", () => {
  it(
    "doesn't wait when FullStory isn't recording",
    withFullStory(async (events) => {
      const started = Date.now()
      await trackFullStoryEventBeforeNavigating("Lesson Completed", {
        lessonId: "a/b",
      })
      expect(Date.now() - started).to.be.below(100)
      expect(events.map((e) => e.name)).to.deep.eq(["Lesson Completed"])
    }, false)
  )

  it(
    "waits for FullStory, up to the cap, while recording",
    withFullStory(async () => {
      const started = Date.now()
      await trackFullStoryEventBeforeNavigating("Lesson Completed", {
        lessonId: "a/b",
      })
      expect(Date.now() - started).to.be.within(450, 1000)
    })
  )
})

describe("Lesson completion", () => {
  const done = (id) => ({ id, status: "completed" })

  it("is new only the first time a lesson is completed", () => {
    expect(lessonCompletedBy("a/b", [], [done("a/b")])).to.eq(true)
    expect(
      lessonCompletedBy("a/b", [done("a/b")], [done("a/b"), done("a/b")])
    ).to.eq(false)
    expect(lessonCompletedBy("a/b", [], [done("a/c")])).to.eq(false)
  })
})
