import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"
import { FreeFormPayload, MultipleChoicePayload } from "common"
import { isLessonCompleted } from "../utils/machineUtils"

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
    const skippedAnswerEvent = {
      type: "SKIP_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
    }

    progressService.send(skippedAnswerEvent)

    expect(isLessonCompleted(progressService, skippedAnswerEvent.id)).to.be.true
  })

  it("can validate a correct multiple choice answer", () => {
    const answerEvent: MultipleChoicePayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 0,
      userAnswerIndex: 1,
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService, answerEvent.id)).to.be.true
  })

  it("can validate an incorrect multiple choice answer", () => {
    const answerEvent: MultipleChoicePayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 0,
      userAnswerIndex: 0,
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService, answerEvent.id)).to.be.false
  })

  it("can validate a correct freeform answer", () => {
    const answerEvent: FreeFormPayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/installing-cypress-and-writing-our-first-test",
      challengeIndex: 0,
      userAnswer: "cy.get('.new-todo').should('exist')",
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService, answerEvent.id)).to.be.true
  })

  it("can validate an incorrect freeform answer", () => {
    const answerEvent: FreeFormPayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/installing-cypress-and-writing-our-first-test",
      challengeIndex: 0,
      userAnswer: "cy.get('.new-todo')",
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService, answerEvent.id)).to.be.false
  })

  it("can disable all challenges", () => {
    progressService.send("DISABLE_CHALLENGES")

    expect(progressService.state.context.disableChallenges).to.be.true
  })
})
