import type { MouseEvent } from "react"
import { progressEventsSent } from "../../machines/progressService"

/**
 * Click handler for a link that leaves a lesson right after progress was saved.
 * The progress service sends Lesson Completed (and Course Completed) when a lesson
 * newly completes, and a full page load can drop a queued event, so a plain click
 * waits until FullStory has them (capped at 500ms, and only while it's recording)
 * before navigating. A modifier click opens a new tab and leaves this page alone.
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
  if (!isPlainClick) return
  event.preventDefault()
  const href = event.currentTarget.href
  progressEventsSent().then(() => window.location.assign(href))
}
