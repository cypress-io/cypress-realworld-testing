import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"
import { FreeFormPayload, MultipleChoicePayload } from "common"

describe("progress machine", () => {
  let progressService
  beforeEach(() => {
    progressService = interpret(progressMachine)
    //.onTransition((state) =>
    //  console.log(state.value)
    //)

    progressService.start()
    expect(progressService.state.value).to.equal("started")
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

  it("can validate an incorrect multiple choice answer", () => {
    const answerEvent: MultipleChoicePayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 0,
      userAnswerIndex: 0,
    }
    progressService.send(answerEvent)

    expect(progressService.state.context.lessonsCompleted).to.not.include(
      answerEvent.id
    )
  })

  it("can validate a correct freeform answer", () => {
    const answerEvent: FreeFormPayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 1,
      userAnswer: "cy.get('.new-todo').should('exist')",
    }
    progressService.send(answerEvent)

    expect(progressService.state.context.lessonsCompleted).to.include(
      answerEvent.id
    )
  })

  it("can validate an incorrect freeform answer", () => {
    const answerEvent: FreeFormPayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 1,
      userAnswer: "cy.get('.new-todo')",
    }
    progressService.send(answerEvent)

    expect(progressService.state.context.lessonsCompleted).to.not.include(
      answerEvent.id
    )
  })

  it("can disable all challenges", () => {
    progressService.send("DISABLE_CHALLENGES")

    expect(progressService.state.context.disableChallenges).to.be.true
  })
})
