// FullStory helpers for learn.cypress.io. The snippet and consent gate are in
// utils/fullstorySnippet.ts; AGENTS.md → FullStory has the rules.
//
// learn.cypress.io, docs.cypress.io, www.cypress.io, and Cypress Cloud record into
// one FullStory org, so this file follows their conventions: event names are Title
// Case "Object Action" in the past tense, and properties are camelCase ids, counts,
// booleans, and fixed labels, never free text or PII. FullStory keys funnels on the
// exact name, so renaming an event breaks every funnel built on it.

/** Every FullStory event this site sends, with its properties. */
export interface FullStoryEvents {
  "Code Block Copied": {
    /** The block's language tag, such as `js`, or an empty string. */
    language: string
    pagePath: string
  }
  "Challenge Answered": {
    /** The lesson's progress id, `<course>/<lesson>`, as the progress machine stores it. */
    lessonId: string
    isCorrect: boolean
    /** 1 for the first answer picked on this page view, 2 for the next, and so on. */
    attemptNumber: number
  }
  "Lesson Completed": { lessonId: string }
}

export type FullStoryEventName = keyof FullStoryEvents

type FullStory = (method: string, options?: unknown) => unknown

declare global {
  interface Window {
    FS?: FullStory
  }
}

const getFullStory = (): FullStory | undefined =>
  typeof window === "undefined" || typeof window.FS !== "function"
    ? undefined
    : window.FS

/**
 * Send a FullStory custom event. Does nothing when FullStory isn't loaded (no org
 * ID, a dev build, no Analytics consent, an ad blocker), and never throws, so
 * tracking can't break the interaction that triggered it.
 */
export function trackFullStoryEvent<Name extends FullStoryEventName>(
  name: Name,
  properties: FullStoryEvents[Name]
): void {
  const fs = getFullStory()
  if (!fs) return
  try {
    fs("trackEvent", { name, properties })
  } catch {}
}

// Cap on how long a page waits for FullStory before navigating away, so tracking
// never stalls a navigation.
const BEFORE_NAVIGATING_TIMEOUT_MS = 500

/**
 * Send a FullStory event and resolve once FullStory has taken it, or after a short
 * cap. Await it before code that navigates away, since a plain `trackEvent` can
 * still be queued when the page unloads.
 */
export function trackFullStoryEventBeforeNavigating<
  Name extends FullStoryEventName
>(name: Name, properties: FullStoryEvents[Name]): Promise<void> {
  const fs = getFullStory()
  if (!fs) return Promise.resolve()

  const sent = new Promise((resolve) =>
    resolve(fs("trackEventAsync", { name, properties }))
  ).catch(() => {})
  const capped = new Promise<void>((resolve) =>
    setTimeout(resolve, BEFORE_NAVIGATING_TIMEOUT_MS)
  )
  return Promise.race([sent, capped]).then(() => {})
}

/** The path of the current page, never its query string or hash. */
export const currentPagePath = (): string =>
  typeof window === "undefined" ? "" : window.location.pathname

// ---------------------------------------------------------------------------
// Page properties
// ---------------------------------------------------------------------------

/** FullStory ignores a `pageName` of 125 characters or more. */
export const PAGE_NAME_MAX = 124

export type Section =
  | "home"
  | "course"
  | "lesson"
  | "tutorials"
  | "tutorial"
  | "real-world-examples"
  | "real-world-example"
  | "other"

export interface FullStoryPageProperties {
  pageName: string
  /** docs.cypress.io sends `docs` and www.cypress.io its own types, so one funnel can follow a visitor across sites. */
  pageType: "learn"
  /** Every page here teaches the Cypress App; the value matches www.cypress.io's `product`. */
  product: "app"
  section: Section
  /** The course a lesson belongs to, from its URL. Lessons only. */
  courseSlug?: string
}

// Keyed on the Next.js route pattern (router.pathname), not the URL, so a new
// lesson needs no change here. A new route lands in `other` until it gets a row.
const ROUTES: Record<string, { section: Section; label?: string }> = {
  "/": { section: "home", label: "Home" },
  "/[course]": { section: "course" },
  "/[course]/[slug]": { section: "lesson" },
  "/tutorials": { section: "tutorials", label: "Tutorials" },
  "/tutorials/[slug]": { section: "tutorial" },
  "/real-world-examples": {
    section: "real-world-examples",
    label: "Real World Examples",
  },
  "/real-world-examples/[slug]": { section: "real-world-example" },
}

const PREFIX: Record<Section, string> = {
  home: "",
  course: "Course",
  lesson: "Lesson",
  tutorials: "",
  tutorial: "Tutorial",
  "real-world-examples": "",
  "real-world-example": "Real World Example",
  other: "Other",
}

/** Drops the site suffix (` | Cypress Testing Tools`, ` | Real World Testing with Cypress`). */
export const titleWithoutSuffix = (title: string): string =>
  title.replace(/\s+\|\s+[^|]*$/, "").trim()

/**
 * The page properties for a page. `route` is Next.js's route pattern
 * (`/[course]/[slug]`), `pathname` the URL path, and `title` the document title.
 */
export function pageProperties(
  route: string,
  pathname: string,
  title: string
): FullStoryPageProperties {
  const { section, label } = ROUTES[route] ?? { section: "other" as Section }
  // The prefix keeps a course and a lesson that share a title apart as separate
  // FullStory Pages.
  const name =
    label ?? `${PREFIX[section]}: ${titleWithoutSuffix(title) || pathname}`
  const properties: FullStoryPageProperties = {
    pageName: name.slice(0, PAGE_NAME_MAX),
    pageType: "learn",
    product: "app",
    section,
  }
  if (section === "lesson") {
    properties.courseSlug = pathname.split("/").filter(Boolean)[0]
  }
  return properties
}

let lastSentPath: string | undefined

/**
 * Send this page's properties once per path. Next.js's <Head> writes the new
 * <title> after the route change completes, so this waits two frames before
 * reading it, as docs.cypress.io does for react-helmet.
 */
export function sendFullStoryPageProperties(route: string): void {
  if (!getFullStory()) return
  const pathname = currentPagePath()
  if (pathname === lastSentPath) return
  lastSentPath = pathname
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      // A second navigation before the frames ran sends its own properties.
      if (currentPagePath() !== pathname) return
      const fs = getFullStory()
      if (!fs) return
      try {
        fs("setProperties", {
          type: "page",
          properties: pageProperties(route, pathname, document.title),
        })
      } catch {}
    })
  )
}

// ---------------------------------------------------------------------------
// Exclusions
// ---------------------------------------------------------------------------

const SEARCH_INPUT = ".DocSearch-Input"

/**
 * The org records in Full capture mode, so typed text is recorded unless excluded.
 * DocSearch renders its modal in a portal we don't own, so `fs-mask` is stamped on
 * its input when it mounts: search interactions stay, what people type doesn't
 * (www.cypress.io masks its site search the same way). Returns a cleanup function.
 */
export function maskSearchInput(): () => void {
  if (typeof MutationObserver === "undefined") return () => {}
  const mask = () =>
    document
      .querySelectorAll(`${SEARCH_INPUT}:not(.fs-mask)`)
      .forEach((input) => input.classList.add("fs-mask"))
  const observer = new MutationObserver(mask)
  observer.observe(document.body, { childList: true, subtree: true })
  mask()
  return () => observer.disconnect()
}
