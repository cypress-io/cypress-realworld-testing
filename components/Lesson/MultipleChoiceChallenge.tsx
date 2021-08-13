import { useRouter } from "next/router"
import { useActor } from "@xstate/react"

import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline"

const features = [
  {
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon,
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: AnnotationIcon,
  },
]

export default function LessonChallenge(props) {
  const router = useRouter()
  const { section, slug } = router.query
  const [progressState, progressSend] = useActor(props.progressService)
  // @ts-ignore
  const isLessonComplete = progressState.context.lessonsCompleted.includes(
    `${section}/${slug}`
  )

  return (
    <div className="py-12 bg-white">
      <hr className="mb-6" />
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

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {props.lessonData.challenges[0].answers.map((answer, index) => (
              <div key={index} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-8 w-8">
                    <input
                      id={`${answer}-${index}`}
                      name="answer"
                      type="checkbox"
                      className="focus:ring-indigo-500 text-indigo-600 border-gray-300 rounded h-8 w-8"
                      onClick={() => {
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
                    htmlFor={`${answer}-${index}`}
                    className="ml-16 text-lg leading-6 font-medium text-gray-900"
                  >
                    {answer}
                  </label>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {/* {feature.description} */}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
