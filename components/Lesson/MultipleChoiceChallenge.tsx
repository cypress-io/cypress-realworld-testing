import { useActor } from "@xstate/react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { Lesson } from "common"

const NextLessonBtn = dynamic(() => import("./NextLessonBtn"), {
  ssr: false,
})

type Props = {
  progressService: any
  lessonData: Lesson
  lessonPath: string
  path: string
  isCompleted: boolean
}

export default function LessonChallenge({
  progressService,
  lessonData,
  lessonPath,
  path,
  isCompleted,
}: Props) {
  const [answerIndicies, setAnswerChecked] = useState([])
  const [, progressSend] = useActor(progressService)

  const isIncorrectAnswer = (index) => {
    return (
      answerIndicies.includes(index) &&
      lessonData.challenges[0].correctAnswerIndex !== index
    )
  }

  return (
    <>
      <hr className="mb-6" />
      <div data-test="multiple-choice-challenge" className="bg-teal-500 py-12">
        <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-full lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="text-center lg:col-span-3 xl:col-span-2">
            <p className="text-base font-semibold text-gray-50">
              Unlock the next lesson
            </p>
          </div>

          <div className="lesson-content lg:col-span-9 xl:col-span-7">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="mt-6 text-3xl font-extrabold leading-8 tracking-tight text-jade-100 sm:text-4xl">
                  {lessonData.challenges[0].question}
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-2xl">
                <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                  {lessonData.challenges[0].answers.map((answer, index) => (
                    <div key={index} className="relative">
                      <dt>
                        <div className="absolute flex h-8 w-8 items-center justify-center">
                          <input
                            id={`answer-${index}`}
                            data-test={`challenge-answer-${index}`}
                            name="answer"
                            type="checkbox"
                            className={`${
                              isIncorrectAnswer(index)
                                ? "text-gray-300 focus:ring-gray-300"
                                : ""
                            } h-8 w-8 rounded border-gray-300 text-blue-600 focus:ring-blue-500`}
                            onClick={() => {
                              setAnswerChecked((prev) => [...prev, index])
                              progressSend({
                                type: "SUBMIT_ANSWER",
                                id: lessonPath,
                                challengeIndex: 0,
                                userAnswerIndex: index,
                              })
                            }}
                          />
                        </div>
                        <label
                          htmlFor={`answer-${index}`}
                          className={`${
                            isIncorrectAnswer(index)
                              ? "text-gray-300 line-through"
                              : ""
                          } ml-16 text-lg font-medium leading-6 text-gray-50`}
                        >
                          {answer}
                        </label>
                      </dt>
                    </div>
                  ))}
                </dl>
                <NextLessonBtn path={path} isCompleted={isCompleted} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
