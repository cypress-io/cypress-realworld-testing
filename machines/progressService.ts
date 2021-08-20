import { interpret, State } from "xstate"
import { progressMachine } from "./progressMachine"
import { ProgressContext } from "common"
const LOCAL_STORAGE_ITEM = "progressState"

const defaultContext: ProgressContext = {
  sectionsCompleted: [],
  lessons: [],
  disableChallenges: false,
  learnData: [],
}

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
  })
  .start(resolvedState)
