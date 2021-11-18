import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
import Image from "next/image"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function HomeCoursesLayout({
  courses,
  content,
  progressService,
}) {
  const [selected, setSelected] = useState(courses[0])

  return (
    <div className="features relative bg-white p-16">
      <div className="mx-auto max-w-md px-4  sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h3 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-8">
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
                  className={({ checked, active }) =>
                    classNames(
                      checked ? "bg-teal-500" : "",
                      active ? "bg-teal-500" : "",
                      "relative bg-gray-50 border rounded-lg shadow-sm px-6 py-4 cursor-pointer flex justify-between items-center"
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
                                "text-gray-400 font-extrabold text-lg flex justify-between items-center"
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
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        {checked && (
                          <a
                            href={`/${content[course].slug}`}
                            className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-jade-300"
                          >
                            Get started
                          </a>
                        )}
                      </RadioGroup.Description>
                      <div
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "" : "border-transparent",
                          "absolute -inset-px rounded-lg pointer-events-none"
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
        <>Right</>
      </div>
    </div>
  )
}
