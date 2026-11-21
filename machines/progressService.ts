import { interpret, State } from "xstate"
import { progressMachine } from "./progressMachine"
import coursesJson from "../data/courses.json"
import { courseCompletedBy } from "../utils/machineUtils"
import { trackFullStoryEvent } from "../utils/fullstory"
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

export const progressService = interpret(progressMachine, {
  devTools: true,
})
  .onTransition((state) => {
    if (state.changed) {
      typeof window !== "undefined" &&
        window.localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(state))
    }
    // A completed lesson or a correct answer can finish a course.
    const { type, id } = state.event as { type: string; id?: string }
    type Lessons = { id: string; status: string }[]
    if (type === "COMPLETE_LESSON" || type === "SUBMIT_ANSWER") {
      const courseSlug = courseCompletedBy(
        coursesJson,
        id,
        state.history?.context.lessons as Lessons,
        state.context.lessons as Lessons
      )
      if (courseSlug) trackFullStoryEvent("Course Completed", { courseSlug })
    }
  })
  .start(resolvedState)
