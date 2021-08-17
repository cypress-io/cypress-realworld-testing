import { useRouter } from "next/router"
import { useActor } from "@xstate/react"
import { useState } from "react"

export default function LessonChallenge({ progressService, lessonData }) {
  const [answerIndicies, setAnswerChecked] = useState([])
  const router = useRouter()
  const { section, slug } = router.query
  const [progressState, progressSend] = useActor(progressService)
  // @ts-ignore
  const isLessonComplete = progressState.context.lessonsCompleted.includes(
    `${section}/${slug}`
  )

  const isIncorrectAnswer = (index) => {
    return (
      answerIndicies.includes(index) &&
      lessonData.challenges[0].correctAnswerIndex !== index
    )
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
              {lessonData.challenges[0].question}
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {lessonData.challenges[0].answers.map((answer, index) => (
                <div key={index} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-8 w-8">
                      <input
                        id={`answer-${index}`}
                        name="answer"
                        type="checkbox"
                        className="focus:ring-indigo-500 text-indigo-600 border-gray-300 rounded h-8 w-8"
                        onClick={() => {
                          setAnswerChecked((prev) => [...prev, index])
                          progressSend({
                            type: "SUBMIT_ANSWER",
                            id: `${section}/${slug}`,
                            challengeIndex: 0,
                            userAnswerIndex: index,
                          })
                        }}
                      />
                    </div>
                    <label
                      htmlFor={`answer-${index}`}
                      className={`${
                        isIncorrectAnswer(index) ? "line-through" : ""
                      } ml-16 text-lg leading-6 font-medium text-gray-900`}
                    >
                      {answer}
                    </label>
                  </dt>
                  <dd
                    className={`${
                      isIncorrectAnswer(index) ? "" : "hidden"
                    } mt-2 ml-16 text-base text-gray-500`}
                  >
                    Details about the answer
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={isLessonComplete ? "" : "hidden"}>
            Next Lesson Button
          </div>
        </div>
      </div>
    </>
  )
}
