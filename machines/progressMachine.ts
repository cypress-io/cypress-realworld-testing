import { createMachine, assign } from "xstate"
import { ProgressContext } from "common"
import { concat, find } from "lodash/fp"
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
  // via _.includes, check that the section is contained in one of the lessonsCompleted
}

const defaultContext: ProgressContext = {
  sectionsCompleted: [],
  lessonsCompleted: [],
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
            actions: ["validateAndLogAnswer"],
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
