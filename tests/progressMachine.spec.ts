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

  it("can validate an incorrect multiple choice answer", () => {
    progressService.send("SUBMIT_ANSWER")
    expect(progressService.state.value).to.equal("inProgress")
  })
})
