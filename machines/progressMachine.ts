import { createMachine, assign } from "xstate"
import { ProgressContext } from "common"
import { concat } from "lodash/fp"
import {
  getSection,
  getChallenge,
  isSectionCompleted,
} from "../utils/machineUtils"
import learnJson from "../learn.json"

// complete challenge
// skip challenge
// disable all challenges

function sectionCompleted(section) {
  // filter stepsCompleted from state and compare length to total lessons in learn.json
}

function isLessonCompleted(lesson) {
  // via _.includes, check that lesson is in state stepsCompleted
}

function isSectionStarted(lesson) {
  // via _.includes, check that the section is contained in one of the lessons
}

const defaultContext: ProgressContext = {
  sectionsCompleted: [],
  lessons: [],
  disableChallenges: false,
}

// progressService.state.matches("ready")
// iterate over navigation, all are "uncompleted"

// progressService.state.matches("inProgress")
// iterate over sections and lessons to determine current lesson

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
