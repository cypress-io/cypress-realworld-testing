import { createMachine } from "xstate"
import { ProgressContext } from "common"
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
  stepsCompleted: [
    "testing-your-first-application/todomvc-app-install-and-overview",
    "testing-your-first-application/installing-cypress-and-writing-our-first-test",
  ],
  challengeAnswers: [],
  disableChallenges: false,
}

// progressService.state.matches("ready")
// iterate over navigation, all are "uncompleted"

// progressService.state.matches("inProgress")
// iterate over sections and lessons to determine current lesson

export const progressMachine = createMachine(
  {
    id: "progress",
    initial: "loading",
    context: defaultContext,
    states: {
      loading: {
        /*entry: assign({
        todos: (context) => {
          // "Rehydrate" persisted todos
          return context.todos.map((todo) => ({
            ...todo,
            ref: spawn(createTodoMachine(todo))
          }));
        }
      }),*/
        always: "ready",
      },
      ready: {
        on: {
          GO_TO_NEXT_CHAPTER: { actions: "saveProgress", target: "inProgress" },
          SUBMIT_ANSWER: { target: "inProgress" },
          SKIP_ANSWER: "",
          DISABLE_CHALLENGES: "",
        },
      },
      inProgress: {
        on: {
          SUBMIT_ANSWER: { actions: "saveProgress" },
          SKIP_ANSWER: "",
          DISABLE_CHALLENGES: "",
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
      saveProgress: () => console.log("save progress@@@@"),
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
