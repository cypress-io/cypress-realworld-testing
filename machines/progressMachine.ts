import { createMachine, assign } from "xstate"
import { ProgressContext } from "common"
import { concat } from "lodash/fp"
import {
  getSection,
  getChallenge,
  isSectionCompleted,
} from "../utils/machineUtils"
import learnJson from "../learn.json"

const defaultContext: ProgressContext = {
  sectionsCompleted: [],
  lessons: [],
  disableChallenges: false,
}

export const progressMachine = createMachine(
  {
    id: "progress",
    initial: "started",
    context: defaultContext,
    states: {
      started: {
        on: {
          SKIP_ANSWER: {
            actions: ["saveProgress"],
          },
          SUBMIT_ANSWER: {
            actions: ["validateAndLogAnswer", "isSectionCompleted"],
          },
          DISABLE_CHALLENGES: { actions: ["disableChallenges"] },
        },
      },
      completed: {
        on: {
          CLEAR_All_PROGRESS: "",
        },
      },
    },
  },
  {
    actions: {
      saveProgress: assign((context: any, event: any) => ({
        lessons: concat(context.lessons, {
          id: event.id,
          status: "completed",
        }),
      })),
      validateAndLogAnswer: assign((context: any, event: any) => {
        const challenge = getChallenge(
          learnJson,
          event.id,
          event.challengeIndex
        )

        const isCorrectMultipleChoiceAnswer =
          challenge.challengeType === "multiple-choice" &&
          challenge.correctAnswerIndex === event.userAnswerIndex

        if (isCorrectMultipleChoiceAnswer) {
          return {
            lessons: concat(context.lessons, {
              id: event.id,
              status: "completed",
            }),
          }
        }
      }),
      disableChallenges: assign((context: any, event: any) => ({
        disableChallenges: true,
      })),

      isSectionCompleted: assign((context: any, event: any) => {
        const [sectionSlug] = event.id.split("/")
        const section = getSection(learnJson, event.id)
        const completedLessons = context.lessons.filter(
          (lesson) => lesson.status === "completed"
        )

        if (
          completedLessons.length === section.lessons.length &&
          !isSectionCompleted(context.sectionsCompleted, sectionSlug)
        ) {
          return {
            sectionsCompleted: concat(context.sectionsCompleted, sectionSlug),
          }
        }
      }),
    },
  }
)
