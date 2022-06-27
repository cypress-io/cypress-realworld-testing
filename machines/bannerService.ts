import { interpret, State } from "xstate"
import { bannerMachine } from "./bannerMachine"
const LOCAL_STORAGE_ITEM = "bannerState"

// @ts-ignore
const stateDefinition =
  typeof window !== "undefined"
    ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_ITEM))
    : undefined

let resolvedState
if (stateDefinition) {
  const previousState = State.create(stateDefinition)

  // @ts-ignore
  resolvedState = bannerMachine.resolveState(previousState)
}

export const bannerService = interpret(bannerMachine, {
  devTools: true,
})
  .onTransition((state) => {
    if (state.changed) {
      typeof window !== "undefined" &&
        window.localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(state))
    }
  })
  .start(resolvedState)
