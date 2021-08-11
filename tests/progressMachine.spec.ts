import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"
import { FreeFormPayload, MultipleChoicePayload } from "common"

const mcInCorrectAnswerEvent: MultipleChoicePayload = {
  type: "SUBMIT_ANSWER",
  id: "testing-your-first-application/todomvc-app-install-and-overview",
  challengeIndex: 0,
  userAnswerIndex: 0,
}

const ffCorrectAnswerEvent: FreeFormPayload = {
  type: "SUBMIT_ANSWER",
  id: "testing-your-first-application/todomvc-app-install-and-overview",
  challengeIndex: 1,
  userAnswer: "cy.get('.new-todo').should('exist')",
}

const ffInCorrectAnswerEvent: FreeFormPayload = {
  type: "SUBMIT_ANSWER",
  id: "testing-your-first-application/todomvc-app-install-and-overview",
  challengeIndex: 1,
  userAnswer: "cy.get('.new-todo')",
}

describe("progress machine", () => {
  let progressService
  beforeEach(() => {
    progressService = interpret(progressMachine)
    //.onTransition((state) =>
    //  console.log(state.value)
    //)

    progressService.start()
    //expect(progressService.state.value).to.equal("ready")
  })

  it("can save the progress", () => {
    progressService.send("GO_TO_NEXT_LESSON", {
      path: "testing-your-first-application/todomvc-app-install-and-overview",
    })
    expect(progressService.state.context.lessonsCompleted).to.include(
      "testing-your-first-application/todomvc-app-install-and-overview"
    )
  })

  it("can validate a correct multiple choice answer", () => {
    const answerEvent: MultipleChoicePayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 0,
      userAnswerIndex: 1,
    }
    progressService.send(answerEvent)

    expect(progressService.state.context.lessonsCompleted).to.include(
      answerEvent.id
    )
  })

  /*
  it("can validate an incorrect multiple choice answer", () => {
    progressService.send(mcInCorrectAnswerEvent)
    expect(progressService.state.value).to.equal("incorrect")
  })
  it("can validate a correct freeform answer", () => {
    progressService.send(ffCorrectAnswerEvent)
    expect(progressService.state.matches("correct")).to.be.true
  })

  it("can validate an incorrect freeform answer", () => {
    progressService.send(ffInCorrectAnswerEvent)
    expect(progressService.state.matches("incorrect")).to.be.true
  })

  it("can save the correct answer", () => {
    expect(progressService.state.context).to.be.empty
    progressService.send(mcCorrectAnswerEvent)
    expect(progressService.state.context).to.not.be.empty
  })

  it("does not save an incorrect answer", () => {
    expect(progressService.state.context).to.be.empty
    progressService.send(ffInCorrectAnswerEvent)
    expect(progressService.state.context).to.be.empty
  })
  */
})
