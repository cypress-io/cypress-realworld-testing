import { assign, createMachine } from "xstate"
import { find } from "lodash/fp"
import learnJson from "../learn.json"

/*
export const progressMachine = createMachine({
  id: "progress",
  initial: "pending",
  context: {
    stepsCompleted: [
        'testing-your-first-application/todomvc-app-install-and-overview'
    ],
    challengeAnswers: [] as ChallengeAnswer[],
  },
})
*/

export const challengeMachine = createMachine(
  {
    id: "challenge",
    initial: "pending",
    context: {
      challengeAnswers: [], // as ChallengeAnswer[],
    },
    states: {
      pending: {
        on: {
          SUBMIT_ANSWER: [
            {
              target: "answeredCorrectly",
              cond: "validateAnswer",
            },
            { target: "invalid" },
          ],
        },
      },
      validating: {},
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
      validateAnswer: (context, event) => {
        const [sectionSlug, lessonSlug] = event.id.split("/")
        const lessons = learnJson[sectionSlug].children
        const lesson = find({ slug: lessonSlug }, lessons)
        const challenge = lesson.challenges[event.challengeIndex]

        if (challenge.challengeType === "multiple-choice") {
          return challenge.correctAnswerIndex === event.userAnswerIndex
        }

        //const userAnswer = normalizeData(event.userAnswer)

        return false
      },
    },
  }
)
