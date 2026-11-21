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
  /** Every lesson in the course is now complete. Sent once, on the lesson that finished it. */
  "Course Completed": { courseSlug: string }
  /** The visitor turned on "Disable questions on upcoming lessons". */
  "Challenges Disabled": Record<string, never>
  /** The visitor turned that setting back off. */
  "Challenges Enabled": Record<string, never>
  "Video Started": { videoId: string; pagePath: string }
  "Video Progressed": {
    videoId: string
    pagePath: string
    percent: VideoMilestone
  }
  "Video Completed": { videoId: string; pagePath: string }
  /** Same name and shape as www.cypress.io's, so one report covers both sites. */
  "Site Search Performed": { index: string; resultCount: number }
}

export type VideoMilestone = 25 | 50 | 75

export type FullStoryEventName = keyof FullStoryEvents

/**
 * The attributes that name a clickable element in FullStory. Labels follow the
 * shared "Surface - Sub-scope - Action" convention, with every surface prefixed
 * "Learn" (docs.cypress.io uses "Docs") so they stay apart in the shared org.
 * `properties` become `data-*` attributes, declared in
 * `data-fs-properties-schema` so FullStory records them with the click. Nested
 * elements don't reliably inherit a label, so styles/global.css turns off
 * pointer events inside labeled links and buttons.
 */
export function fsLabel(
  name: string,
  properties: Record<string, string> = {}
): Record<string, string> {
  const attributes: Record<string, string> = { "data-fs-element": name }
  const keys = Object.keys(properties)
  if (!keys.length) return attributes
  const schema: Record<string, "str"> = {}
  for (const key of keys) {
    attributes[`data-${key}`] = properties[key]
    schema[`data-${key}`] = "str"
  }
  attributes["data-fs-properties-schema"] = JSON.stringify(schema)
  return attributes
}

const DOCS_HOSTS = ["docs.cypress.io", "on.cypress.io"]
const WWW_HOSTS = ["www.cypress.io", "cypress.io"]

/** The label for a link in lesson content, or undefined for one that needs none. */
export function contentLinkLabel(href: string | undefined): string | undefined {
  if (!href) return undefined
  let host: string
  try {
    host = new URL(href).hostname
  } catch {
    return undefined // relative and in-page links
  }
  if (DOCS_HOSTS.includes(host)) return "Learn Content - Docs Link"
  if (WWW_HOSTS.includes(host)) return "Learn Content - Cypress.io Link"
  return undefined
}

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

// ---------------------------------------------------------------------------
// Site search
// ---------------------------------------------------------------------------

export const SEARCH_INDEX = "real_world_testing"

// How long typing has to pause before a search counts as one search.
const SEARCH_SETTLE_MS = 1000

/**
 * Wraps DocSearch's Algolia client so a settled search sends `Site Search
 * Performed`, as www.cypress.io's search does: once typing pauses for a second,
 * or at once if the visitor leaves the page first (picking a hit). A repeat of
 * the last sent query, or an empty one, sends nothing. The query is kept only to
 * compare; it's never sent.
 */
export function createSearchTracker(settleMs = SEARCH_SETTLE_MS) {
  let pending: { query: string; resultCount: number } | undefined
  let lastSent: string | undefined
  let timer: ReturnType<typeof setTimeout> | undefined

  const flush = () => {
    if (timer) clearTimeout(timer)
    timer = undefined
    if (!pending) return
    const { query, resultCount } = pending
    pending = undefined
    if (query === lastSent) return
    lastSent = query
    trackFullStoryEvent("Site Search Performed", {
      index: SEARCH_INDEX,
      resultCount,
    })
  }

  let listening = false
  const onResults = (query: string, resultCount: number) => {
    const trimmed = query.trim()
    if (!trimmed) return
    if (!listening && typeof window !== "undefined") {
      window.addEventListener("pagehide", flush)
      listening = true
    }
    pending = { query: trimmed, resultCount }
    if (timer) clearTimeout(timer)
    timer = setTimeout(flush, settleMs)
  }

  return { onResults, flush }
}

type SearchRequest = { query?: string; params?: { query?: string } }
type SearchResponse = { results?: Array<{ nbHits?: number }> }

const searchTracker = createSearchTracker()

/** For DocSearch's `transformSearchClient`. Keep it module-level: DocSearch rebuilds its client when the function changes. */
export function trackSearchClient<Client>(client: Client): Client {
  const search = (client as any).search.bind(client)
  return {
    ...client,
    search: (requests: SearchRequest[], ...rest: unknown[]) =>
      search(requests, ...rest).then((response: SearchResponse) => {
        try {
          const request = requests[0]
          const query = request?.query ?? request?.params?.query ?? ""
          searchTracker.onResults(query, response?.results?.[0]?.nbHits ?? 0)
        } catch {}
        return response
      }),
  }
}

// ---------------------------------------------------------------------------
// Video
// ---------------------------------------------------------------------------

export const VIDEO_MILESTONES: VideoMilestone[] = [25, 50, 75]

/**
 * Turns a video's playback into Video Started, Video Progressed, and Video
 * Completed, each at most once per video per page view. Seeking past a milestone
 * counts as reaching it.
 */
export function createVideoTracker(videoId: string) {
  let started = false
  let completed = false
  const reached = new Set<VideoMilestone>()
  const props = () => ({ videoId, pagePath: currentPagePath() })

  return {
    played() {
      if (started) return
      started = true
      trackFullStoryEvent("Video Started", props())
    },
    progressed(currentTime: number, duration: number) {
      if (!started || !(duration > 0)) return
      const percent = (currentTime / duration) * 100
      for (const milestone of VIDEO_MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone)
          trackFullStoryEvent("Video Progressed", {
            ...props(),
            percent: milestone,
          })
        }
      }
    },
    ended() {
      if (completed) return
      completed = true
      trackFullStoryEvent("Video Completed", props())
    },
  }
}
