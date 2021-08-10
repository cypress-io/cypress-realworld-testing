import { assign, createMachine } from "xstate"
import { find } from "lodash/fp"
import learnJson from "../learn.json"
import { ChallengeAnswer } from "common"

export const challengeMachine = createMachine(
  {
    id: "challenge",
    initial: "pending",
    context: {} as ChallengeAnswer,
    states: {
      pending: {
        on: {
          SUBMIT_ANSWER: [
            {
              target: "correct",
              cond: "validateAnswer",
            },
            { target: "incorrect" },
          ],
        },
      },
      correct: {
        entry: "saveChallengeAnswer",
      },
      incorrect: {},
    },
  },
  {
    actions: {
      saveChallengeAnswer: assign((ctx: any, event: any) => ({
        id: event.id,
        answeredCorrectly: true,
      })),
    },
    guards: {
      validateAnswer: (context, event) => {
        const [sectionSlug, lessonSlug] = event.id.split("/")
        const lessons = learnJson[sectionSlug].children
        const lesson = find({ slug: lessonSlug }, lessons)
        const challenge = lesson.challenges[event.challengeIndex]

        if (challenge.challengeType === "multiple-choice") {
          return challenge.correctAnswerIndex === event.userAnswerIndex
        }

        if (challenge.challengeType === "freeform") {
          return challenge.answer === event.userAnswer
        }
      },
    },
  }
)
