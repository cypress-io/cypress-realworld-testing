import { createMachine, assign } from "xstate"
import { ProgressContext } from "common"
import { get } from "lodash/fp"
import {
  getSection,
  getSectionIndex,
  findLesson,
  getLessonIndex,
  getChallenge,
} from "../utils/machineUtils"
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
          learnData: learnJson,
        }),
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
        console.log(learnDataCopy[sectionIndex].lessons[lessonIndex].status)

        return { learnData: learnDataCopy }
      }),

      validateAndLogAnswer: assign((context: any, event: any) => {
        const sectionIndex = getSectionIndex(context.learnData, event.id)
        const lessonIndex = getLessonIndex(context.learnData, event.id)
        const challenge = getChallenge(
          context.learnData,
          event.id,
          event.challengeIndex
        )
        const learnDataCopy = context.learnData

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
