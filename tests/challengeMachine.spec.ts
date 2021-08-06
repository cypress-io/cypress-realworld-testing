import { expect } from "chai"
import { challengeMachine } from "../machines/challenges"

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

describe("challenge machine", () => {
  it("should be able to execute a test", () => {
    expect(true).to.be.true
  })
})
