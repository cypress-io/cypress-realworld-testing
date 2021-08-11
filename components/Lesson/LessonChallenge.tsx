import { useRouter } from "next/router"

export default function LessonChallenge(props) {
  const router = useRouter()
  const { section, slug } = router.query
  const isLessonComplete =
    props.progressState.context.lessonsCompleted.includes(`${section}/${slug}`)

  return (
    <form className="space-y-8 divide-y divide-gray-200 mb-52">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-email">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                  <div>
                    <div
                      className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                      id="label-email"
                    >
                      Answer Correct: {isLessonComplete ? "TRUE" : "FALSE"}
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg space-y-4">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            onClick={() => {
                              props.progressSend({
                                type: "SUBMIT_ANSWER",
                                id: "testing-your-first-application/todomvc-app-install-and-overview",
                                challengeIndex: 0,
                                userAnswerIndex: 1,
                              })
                            }}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="comments"
                            className="font-medium text-gray-700"
                          >
                            Answer 1
                          </label>
                          {/* <p className="text-gray-500">
                            Get notified when someones posts a comment on a
                            posting.
                          </p> */}
                        </div>
                      </div>
                      <div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="candidates"
                              name="candidates"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="candidates"
                              className="font-medium text-gray-700"
                            >
                              Answer 2
                            </label>
                            {/* <p className="text-gray-500">
                              Get notified when a candidate applies for a job.
                            </p> */}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="offers"
                              className="font-medium text-gray-700"
                            >
                              Answer 3
                            </label>
                            {/* <p className="text-gray-500">
                              Get notified when a candidate accepts or rejects
                              an offer.
                            </p> */}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="offers"
                              className="font-medium text-gray-700"
                            >
                              Answer 4
                            </label>
                            {/* <p className="text-gray-500">
                              Get notified when a candidate accepts or rejects
                              an offer.
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
