import { CheckIcon } from "@heroicons/react/outline"
import CourseProgress from "./CourseProgress"
import { Lesson } from "common"

type Props = {
  title: string
  lessons: Lesson[]
  learnFeatures: string[]
  progressService: object
  course: string
}

export default function CourseContent({
  title,
  lessons,
  learnFeatures,
  progressService,
  course,
}: Props) {
  return (
    <>
      <hr />
      <div className="py-16 overflow-hidden">
        <div className="px-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
            <div className="relative z-10">
              <div className="flex mx-auto text-base max-w-prose lg:max-w-none">
                <div className="">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-700">
                    What You Will Learn:
                  </h2>

                  {/* Features */}
                  <div className="mt-12">
                    <dl className="">
                      {learnFeatures.map((feature, index) => (
                        <div key={index} className="relative mb-6">
                          <dt>
                            <CheckIcon
                              className="absolute w-6 h-6 text-indigo-500"
                              aria-hidden="true"
                            />
                            <p className="text-lg font-medium leading-6 text-gray-700 ml-9">
                              {feature}
                            </p>
                          </dt>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative mx-auto mt-12 text-base max-w-prose lg:mt-0 lg:max-w-none">
              <div className="relative max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-0">
                <CourseProgress
                  course={course}
                  lessons={lessons}
                  progressService={progressService}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
