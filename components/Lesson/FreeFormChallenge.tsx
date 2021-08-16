import { useRouter } from "next/router"
import { useActor } from "@xstate/react"

export default function LessonChallenge(props) {
  const router = useRouter()
  const { section, slug } = router.query
  const [progressState, progressSend] = useActor(props.progressService)
  // @ts-ignore
  const isLessonComplete = progressState.context.lessonsCompleted.includes(
    `${section}/${slug}`
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    progressSend({
      type: "SUBMIT_ANSWER",
      id: `${section}/${slug}`,
      challengeIndex: 0,
      userAnswer: event.target[0].value,
    })
  }

  return (
    <>
      <hr className="mb-6" />
      <div className="py-12 flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Unlock the Next Lesson
            </h2>
            <p className="mt-6 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {props.lessonData.challenges[0].question}
            </p>
            {isLessonComplete ? "CORRECT" : "INCORRECT"}
          </div>

          <div className="mt-10 max-w-sm mx-auto">
            <form
              onSubmit={handleSubmit}
              className="mt-5 sm:flex sm:items-center"
            >
              <div className="w-full sm:max-w-xs">
                <label htmlFor="answer" className="sr-only">
                  Answer
                </label>
                <input
                  type="text"
                  name="answer"
                  id="answer"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
