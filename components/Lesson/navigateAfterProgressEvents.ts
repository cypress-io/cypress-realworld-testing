import type { MouseEvent } from "react"
import { progressEventsSent } from "../../machines/progressService"
import { isFullStoryCapturing } from "../../utils/fullstory"

/**
 * Click handler for a link that leaves a lesson right after progress was saved.
 * The progress service sends Lesson Completed (and Course Completed) when a lesson
 * newly completes, and a full page load can drop a queued event, so a plain click
 * waits until FullStory has them (capped at 500ms, and only while it's recording)
 * before navigating. A modifier click opens a new tab and leaves this page alone.
 *
 * Without capture there's nothing to wait for, so the link navigates natively, as
 * any link does. Holding it anyway would turn every click into a navigation
 * started from JavaScript a moment later.
 */
export function navigateAfterProgressEvents(
  event: MouseEvent<HTMLAnchorElement>
): void {
  const isPlainClick =
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  if (!isPlainClick || !isFullStoryCapturing()) return
  event.preventDefault()
  const href = event.currentTarget.href
  progressEventsSent().then(() => window.location.assign(href))
}
