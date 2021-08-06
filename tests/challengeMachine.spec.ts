import { expect } from "chai"
import { ChallengeAnswer, FreeFormPayload, MultipleChoicePayload } from "common"
import { interpret } from "xstate"
import { challengeMachine } from "../machines/challenges"

const mcCorrectAnswerEvent: MultipleChoicePayload = {
  type: "SUBMIT_ANSWER",
  id: "testing-your-first-application/todomvc-app-install-and-overview",
  challengeIndex: 0,
  userAnswerIndex: 1,
}

const mcInCorrectAnswerEvent: MultipleChoicePayload = {
  type: "SUBMIT_ANSWER",
  id: "testing-your-first-application/todomvc-app-install-and-overview",
  challengeIndex: 0,
  userAnswerIndex: 0,
}

const ffEvent: FreeFormPayload = {
  type: "SUBMIT_ANSWER",
  id: "testing-your-first-application/todomvc-app-install-and-overview",
  challengeIndex: 1,
  userAnswer: "cy.get('.new-todo').should('exist')",
}

const challengeAnswer: ChallengeAnswer = {
  id: "testing-your-first-application/todomvc-app-install-and-overview",
  answeredCorrectly: true,
  skipped: false,
}

describe("challenge machine", () => {
  let challengeService
  beforeEach(() => {
    challengeService = interpret(challengeMachine)
    //.onTransition((state) =>
    //  console.log(state.value)
    //)

    challengeService.start()
    expect(challengeService.state.value).to.equal("pending")
  })
  it("can validate a correct multiple choice answer", () => {
    challengeService.send(mcCorrectAnswerEvent)

    expect(challengeService.state.value).to.equal("answeredCorrectly")
  })

  it("can validate an incorrect multiple choice answer", () => {
    challengeService.send(mcInCorrectAnswerEvent)

    expect(challengeService.state.value).to.equal("invalid")
  })
})
