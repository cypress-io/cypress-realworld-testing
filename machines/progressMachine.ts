import { createMachine, assign } from "xstate"
import { ProgressContext } from "common"
import {
  getSection,
  getSectionIndex,
  getLessonIndex,
  getChallenge,
} from "../utils/machineUtils"

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
      saveProgress: assign((context: any, event: any) => {
        const sectionIndex = getSectionIndex(context.learnData, event.id)
        const lessonIndex = getLessonIndex(context.learnData, event.id)
        const learnDataCopy = context.learnData
        learnDataCopy[sectionIndex].lessons[lessonIndex].status = "completed"
        return { learnData: learnDataCopy }
      }),

      validateAndLogAnswer: assign((context: any, event: any) => {
        const learnDataCopy = context.learnData
        const sectionIndex = getSectionIndex(context.learnData, event.id)
        const lessonIndex = getLessonIndex(context.learnData, event.id)
        const challenge = getChallenge(
          context.learnData,
          event.id,
          event.challengeIndex
        )

        const isCorrectMultipleChoiceAnswer =
          challenge.challengeType === "multiple-choice" &&
          challenge.correctAnswerIndex === event.userAnswerIndex

        const isCorrectFreeFormAnswer =
          challenge.challengeType === "freeform" &&
          challenge.answer === event.userAnswer

        if (isCorrectMultipleChoiceAnswer || isCorrectFreeFormAnswer) {
          learnDataCopy[sectionIndex].lessons[lessonIndex].status = "completed"

          return { learnData: learnDataCopy }
        } else {
          learnDataCopy[sectionIndex].lessons[lessonIndex].status = null

          return { learnData: learnDataCopy }
        }
      }),

      isSectionCompleted: assign((context: any, event: any) => {
        const learnDataCopy = context.learnData
        const section = getSection(learnDataCopy, event.id)
        const sectionIndex = getSectionIndex(context.learnData, event.id)
        // @ts-ignore
        const completedLessons = section.lessons.filter(
          (lesson) => lesson.status === "completed"
        )

        // @ts-ignore
        if (completedLessons.length === section.lessons.length) {
          learnDataCopy[sectionIndex].status = "completed"
          return { learnData: learnDataCopy }
        }
      }),

      disableChallenges: assign((context: any, event: any) => ({
        disableChallenges: true,
      })),
    },
  }
)
