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
    <div className="features relative bg-white p-16">
      <div className="mx-auto max-w-md px-4  sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h3 className="mt-2 mb-8 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Courses
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Course Selector */}
        <>
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <RadioGroup.Option
                  key={index}
                  value={course}
                  data-test={`course-${index}`}
                  className={({ checked, active }) =>
                    classNames(
                      checked ? "bg-teal-500" : "bg-gray-50",
                      active ? "" : "bg-teal-500",
                      "relative  flex cursor-pointer items-center justify-between rounded-lg border px-6 py-4 shadow-sm"
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            // className="font-medium text-gray-900"
                            className={() =>
                              classNames(
                                checked ? "text-jade-50" : "",
                                active ? "text-gray-900" : "",
                                "flex items-center justify-between text-lg font-extrabold text-gray-400"
                              )
                            }
                          >
                            <Image
                              className="h-8 w-auto sm:h-10"
                              src={`/images/home/${course}.svg`}
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
                        className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:block sm:text-right"
                      >
                        {checked && (
                          <a
                            href={`/${content[course].slug}`}
                            className="inline-flex rounded-md border border-transparent bg-jade-300 px-4 py-2 text-base font-medium text-white shadow-sm"
                          >
                            Get started
                          </a>
                        )}
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
        </>

        {/* Course Progress */}
        <>
          <HomeProgress
            course={selected}
            content={content[selected]}
            progressService={progressService}
          />
        </>
      </div>
    </div>
  )
}
