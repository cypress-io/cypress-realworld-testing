import { expect } from "chai"
import { interpret } from "xstate"
import { challengeMachine } from "../machines/challenges"

/*
const mcEvent: MultipleChoicePayload = {
  type: "SUBMIT_ANSWER",
  id: "testing-your-first-application/todomvc-app-install-and-overview",
  challengeIndex: 0,
  userAnswerIndex: 1,
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
*/

describe("challenge machine", () => {
  let challengeService
  beforeEach(() => {
    challengeService = interpret(challengeMachine).onTransition((state) =>
      console.log(state.value)
    )

    challengeService.start()
  })
  it("can validate a correct answer", () => {
    expect(challengeService.state.value).to.equal("pending")

    challengeService.send({
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 0,
      userAnswerIndex: 1,
    })

    expect(challengeService.state.value).to.equal("answeredCorrectly")
  })
})
