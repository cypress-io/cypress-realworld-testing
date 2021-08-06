import { assign, createMachine } from "xstate"
import { find } from "lodash/fp"
import learnJson from "../learn.json"

interface ChallengeAnswer {
  id: string
  answeredCorrectly?: boolean
  skipped?: boolean
}
interface EventPayload {
  type: string
  id: string
  challengeIndex: number
}

interface MultipleChoicePayload extends EventPayload {
  userAnswerIndex: number
}

interface FreeFormPayload extends EventPayload {
  userAnswer: string
}

const validateAnswer = (context, event) => {
  const { sectionSlug, lessonSlug } = event.id.split("/")
  const lessons = learnJson[sectionSlug].children
  const lesson = find({ slug: lessonSlug }, lessons)
  const challenge = lesson[event.challengeIndex]

  if (challenge.challengeType === "multiple-choice") {
    return event.correctAnswerIndex === event.userAnswerIndex
  }

  //const userAnswer = normalizeData(event.userAnswer)

  return false
}

export const challengeMachine = createMachine(
  {
    id: "challenge",
    initial: "pending",
    context: {
      challengeAnswers: [] as ChallengeAnswer[],
    },
    states: {
      pending: {
        on: {
          SUBMIT_ANSWER: "validating",
        },
      },
      validating: {
        on: {
          "": [
            {
              target: "answeredCorrectly",
              cond: validateAnswer,
            },
            { target: "invalid" },
          ],
        },
      },
      answeredCorrectly: {
        entry: "saveChallengeAnswer",
      },
      invalid: {},
    },
  },
  {
    actions: {
      saveChallengeAnswer: assign((ctx: any, event: any) => ({
        challengeAnswers: ctx.challengeAnswers.push({
          id: event.id,
          answeredCorrectly: true,
        }),
      })),
    },
    guards: {
      validateAnswer,
    },
  }
)

// Examples
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
