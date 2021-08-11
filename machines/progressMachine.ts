import { createMachine, assign } from "xstate"
import { ProgressContext } from "common"
import { concat, find } from "lodash/fp"
import learnJson from "../learn.json"
//const LOCAL_STORAGE_ITEM = "progressState"

// complete challenge
// skip challenge
// disable all challenges

function sectionCompleted(section) {
  // filter stepsCompleted from state and compare length to total lessons in learn.json
}

function isLessonCompleted(lesson) {
  // via _.includes, check that lesson is in state stepsCompleted
}

const defaultContext: ProgressContext = {
  sectionsCompleted: ["testing-your-first-application"],
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
          GO_TO_NEXT_LESSON: {
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
      })),
      validateAndLogAnswer: assign((context: any, event: any) => {
        const [sectionSlug, lessonSlug] = event.id.split("/")
        const lessons = learnJson[sectionSlug].children
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

/*
// @ts-ignore
const stateDefinition = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM))

let resolvedState
if (stateDefinition) {
  const previousState = State.create(stateDefinition)

  // @ts-ignore
  resolvedState = progressMachine.resolveState(previousState)
}

export const progressService = interpret(progressMachine)
  .onTransition((state) => {
    if (state.changed) {
      localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(state))
    }
  })
  .start(resolvedState)
*/
