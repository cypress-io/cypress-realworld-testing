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
      <div className="overflow-hidden py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
            <div className="relative z-10">
              <div className="flex text-base max-w-prose mx-auto lg:max-w-none">
                <div className="">
                  <h2 className="text-3xl text-gray-700 font-bold tracking-tight">
                    What You Will Learn:
                  </h2>

                  {/* Features */}
                  <div className="mt-12">
                    <dl className="">
                      {learnFeatures.map((feature, index) => (
                        <div key={index} className="relative mb-6">
                          <dt>
                            <CheckIcon
                              className="absolute h-6 w-6 text-indigo-500"
                              aria-hidden="true"
                            />
                            <p className="ml-9 text-lg font-medium leading-6 text-gray-600">
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
            <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
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
