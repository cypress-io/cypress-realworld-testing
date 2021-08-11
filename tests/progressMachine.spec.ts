import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"

describe("progress machine", () => {
  let progressService
  beforeEach(() => {
    progressService = interpret(progressMachine)
    //.onTransition((state) =>
    //  console.log(state.value)
    //)

    progressService.start()
    expect(progressService.state.value).to.equal("ready")
  })

  it("can save the progress", () => {
    progressService.send("GO_TO_NEXT_LESSON", {
      path: "testing-your-first-application/todomvc-app-install-and-overview"
    })
    expect(progressService.state.context.stepsCompleted).to.include("testing-your-first-application/todomvc-app-install-and-overview")
  })
})
