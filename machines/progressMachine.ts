import { createMachine, assign } from "xstate"
import { ProgressContext } from "common"
import { concat, find } from "lodash/fp"
import learnJson from "../learn.json"
// import {
//   getSection,
//   getSectionIndex,
//   getLessonIndex,
//   getChallenge,
// } from "../utils/machineUtils"

export const progressMachine = createMachine(
  {
    id: "progress",
    initial: "started",
    context: {
      sectionsCompleted: [],
      lessons: [],
      disableChallenges: false,
      learnData: [],
    } as ProgressContext,
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
        lessonsCompleted: concat(context.lessonsCompleted, event.path),
        lessonsSkipped: concat(context.lessonsCompleted, event.path),
      })),
      validateAndLogAnswer: assign((context: any, event: any) => {
        const [sectionSlug, lessonSlug] = event.id.split("/")
        const lessons = learnJson[sectionSlug].lessons
        const lesson = find({ slug: lessonSlug }, lessons)
        const challenge = lesson.challenges[event.challengeIndex]

        const isCorrectMultipleChoiceAnswer =
          challenge.challengeType === "multiple-choice" &&
          challenge.correctAnswerIndex === event.userAnswerIndex

        const isCorrectFreeFormAnswer =
          challenge.challengeType === "freeform" &&
          challenge.answer === event.userAnswer

        if (isCorrectMultipleChoiceAnswer || isCorrectFreeFormAnswer) {
          return {
            lessonsCompleted: concat(context.lessonsCompleted, event.id),
          }
        }
      }),

      disableChallenges: assign((context: any, event: any) => ({
        disableChallenges: true,
      })),
    },
  }
)
