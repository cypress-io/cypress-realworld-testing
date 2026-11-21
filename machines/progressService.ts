import { interpret, State } from "xstate"
import { progressMachine } from "./progressMachine"
import coursesJson from "../data/courses.json"
import { courseCompletedBy, lessonCompletedBy } from "../utils/machineUtils"
import { trackFullStoryEventBeforeNavigating } from "../utils/fullstory"
const LOCAL_STORAGE_ITEM = "progressState"

// @ts-ignore
const stateDefinition =
  typeof window !== "undefined"
    ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_ITEM))
    : undefined

let resolvedState
if (stateDefinition) {
  const previousState = State.create(stateDefinition)

  // @ts-ignore
  resolvedState = progressMachine.resolveState(previousState)
}

type Lessons = { id: string; status: string }[]

// The restored state still carries the event and history that produced it, so
// the transition .start() reports on page load would look like a new completion.
// Only transitions after start count.
let started = false
let tracked: Promise<unknown> = Promise.resolve()

/**
 * Resolves once FullStory has the events from the latest progress change (or
 * after a short cap). Await it before navigating away after a COMPLETE_LESSON.
 */
export const progressEventsSent = (): Promise<unknown> => tracked

// Lesson Completed and Course Completed fire here, on the saved outcome, so a
// lesson finished by a correct answer counts, and re-completing a finished
// lesson doesn't.
function trackCompletions(state) {
  const { type, id } = state.event as { type: string; id?: string }
  if (type !== "COMPLETE_LESSON" && type !== "SUBMIT_ANSWER") return
  const previous = state.history?.context.lessons as Lessons
  const next = state.context.lessons as Lessons
  if (!lessonCompletedBy(id, previous, next)) return
  const sends = [
    trackFullStoryEventBeforeNavigating("Lesson Completed", { lessonId: id }),
  ]
  const courseSlug = courseCompletedBy(coursesJson, id, previous, next)
  if (courseSlug) {
    sends.push(
      trackFullStoryEventBeforeNavigating("Course Completed", { courseSlug })
    )
  }
  tracked = Promise.all(sends)
}

export const progressService = interpret(progressMachine, {
  devTools: true,
})
  .onTransition((state) => {
    if (state.changed) {
      typeof window !== "undefined" &&
        window.localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(state))
    }
    if (started) trackCompletions(state)
  })
  .start(resolvedState)

started = true
