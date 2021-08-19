import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"
import {
  FreeFormPayload,
  MultipleChoicePayload,
  SkipAnswerPayload,
} from "common"
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

  it("completes the lesson when the challenge is skipped", () => {
    const skipAnswer: SkipAnswerPayload = {
      type: "SKIP_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
    }

    progressService.send(skipAnswer)

    expect(isLessonCompleted(progressService.state, skipAnswer.id)).to.be.true
  })

  it("completes the lesson when a multiple choice answer is correct", () => {
    const answerEvent: MultipleChoicePayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 0,
      userAnswerIndex: 1,
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService.state, answerEvent.id)).to.be.true
  })

  it("does not complete the lesson when a multiple choice answer is incorrect", () => {
    const answerEvent: MultipleChoicePayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/todomvc-app-install-and-overview",
      challengeIndex: 0,
      userAnswerIndex: 0,
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService.state, answerEvent.id)).to.be.false
  })

  it("completes the lesson when a freeForm answer is correct", () => {
    const answerEvent: FreeFormPayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/installing-cypress-and-writing-our-first-test",
      challengeIndex: 0,
      userAnswer: "cy.get('.new-todo').should('exist')",
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService.state, answerEvent.id)).to.be.true
  })

  it("does not complete the lesson when a freeForm answer is incorrect", () => {
    const answerEvent: FreeFormPayload = {
      type: "SUBMIT_ANSWER",
      id: "testing-your-first-application/installing-cypress-and-writing-our-first-test",
      challengeIndex: 0,
      userAnswer: "cy.get('.new-todo')",
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService.state, answerEvent.id)).to.be.false
  })

  it("can disable all challenges", () => {
    progressService.send("DISABLE_CHALLENGES")

    expect(progressService.state.context.disableChallenges).to.be.true
  })
})
