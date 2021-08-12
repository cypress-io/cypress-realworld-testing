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
    <div className="space-y-8 divide-y divide-gray-200 mb-52">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-email">
                <div>
                  <div
                    className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                    id="label-email"
                  >
                    {props.lessonData.challenges[0].question}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg space-y-4">
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
                <br />
                <br />
                {isLessonComplete ? "CORRECT" : "INCORRECT"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
