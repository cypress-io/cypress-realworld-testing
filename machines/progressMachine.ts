import { createMachine, assign } from "xstate"
import { ProgressContext } from "common"
import { concat, find, findIndex } from "lodash/fp"
import {getSection, getSectionIndex, findLesson, getLessons, getLessonIndex} from "../utils/machineUtils"
import learnJson from "../learnData.json"

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
  learnData: [],
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
        entry: assign({
        learnData: (context) => {
          //@ts-ignore
          return context.learnData = learnJson

        }
      }),
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
        lessons: concat(context.lessons, {
          id: event.id,
          status: "completed"
        }),
      })),
      validateAndLogAnswer: assign((context: any, event: any) => {
        const [sectionSlug, lessonSlug] = event.id.split("/")
        const section = getSection(context.learnData, sectionSlug)
        const sectionIndex = getSectionIndex(context.learnData, sectionSlug)
        const lessons = getLessons(section)
        const lesson = findLesson(lessons, lessonSlug)
        const lessonIndex = getLessonIndex(lessons, lessonSlug)
        const challenge = lesson.challenges[event.challengeIndex]
        

        const isCorrectMultipleChoiceAnswer =
          challenge.challengeType === "multiple-choice" &&
          challenge.correctAnswerIndex === event.userAnswerIndex

        const isCorrectFreeFormAnswer =
          challenge.challengeType === "freeform" &&
          challenge.answer === event.userAnswer

        if (isCorrectMultipleChoiceAnswer || isCorrectFreeFormAnswer) {
          const learnDataCopy = context.learnData
          learnDataCopy[sectionIndex].lessons[lessonIndex].status = "completed"
          
        // @ts-ignore
          assign({ learnData: (context) => { return context.learnData = learnDataCopy }})
        }
      }),
      disableChallenges: assign((context: any, event: any) => ({
        disableChallenges: true,
      })),
    },
  }
)
