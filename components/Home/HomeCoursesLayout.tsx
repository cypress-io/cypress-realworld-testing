import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
import Image from "next/image"
import dynamic from "next/dynamic"

const HomeProgress = dynamic(() => import("./HomeProgress"), {})

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  content: object
  courses: string[]
  progressService: object
}

export default function HomeCoursesLayout({
  courses,
  content,
  progressService,
}: Props) {
  const [selected, setSelected] = useState(courses[0])

  return (
    <div
      id="courses"
      className="hidden w-full px-8 mx-auto features lg:block xl:py-28 xl:px-44"
    >
      <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-full lg:px-8">
        <h3 className="py-8 mt-2 text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-5xl lg:py-12 xl:mb-24">
          Courses
        </h3>
      </div>

      <div className="max-w-3xl mx-auto sm:px-6 lg:grid lg:max-w-full lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Course Selector */}
        <div className="course-selector lg:col-span-6 lg:block">
          <div className="sticky top-2">
            <RadioGroup value={selected} onChange={setSelected}>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={course}
                    data-test={`course-${index}`}
                    className={({ checked, active }) =>
                      classNames(
                        checked
                          ? "border-2 border-indigo-400 shadow-2xl"
                          : "border-2 border-gray-200 bg-white opacity-50",
                        "flex cursor-pointer items-center justify-between rounded-lg px-6 py-4"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={() =>
                                classNames(
                                  checked ? "text-gray-900" : "",
                                  active ? "text-gray-900" : "",
                                  "flex items-center justify-between text-lg font-normal text-gray-900"
                                )
                              }
                            >
                              <Image
                                className="w-auto h-8 sm:h-10"
                                src={`/images/home/course-icons/${course}.svg`}
                                alt="Cypress Logo"
                                height={62}
                                width={75}
                              />
                              {content[course].title}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="div"
                              className="text-gray-500"
                            ></RadioGroup.Description>
                          </div>
                        </div>
                        <RadioGroup.Description
                          as="div"
                          className="flex mt-2 text-sm sm:mt-0 sm:ml-4 sm:block sm:text-right"
                        >
                          <a
                            href={`/${content[course].slug}`}
                            className="inline-flex px-4 py-2 text-base font-medium text-white"
                          >
                            <img
                              src={`/images/home/course-icons/chevron-right.svg`}
                              alt=""
                              className="hidden lg:block"
                            />
                          </a>
                        </RadioGroup.Description>
                        <div
                          className={classNames(
                            active ? "border" : "border-2",
                            checked ? "" : "border-transparent",
                            "pointer-events-none absolute -inset-px rounded-lg"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Course Progress */}
        <div className="course-progress lg:col-span-6">
          <div className="relative overflow-hidden bg-white">
            <div className="relative lg:px-8">
              <HomeProgress
                course={selected}
                content={content[selected]}
                progressService={progressService}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
