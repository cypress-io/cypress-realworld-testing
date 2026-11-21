import { expect } from "chai"
import vm from "vm"
import { PAGE_NAME_MAX, pageProperties } from "../utils/fullstory"
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
    head.save({ ANALYTICS: "ACCEPT" })
    expect(head.calls).to.include("start")
  })

  it("shuts down and restarts as consent changes", () => {
    const head = runHead({ ANALYTICS: "ACCEPT" })
    head.save({ ANALYTICS: "DENY" })
    head.save({ ANALYTICS: "ACCEPT" })
    expect(head.calls.slice(-3)).to.deep.eq(["start", "shutdown", "restart"])
  })
})
