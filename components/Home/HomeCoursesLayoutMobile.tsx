import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
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

export default function HomeCoursesLayoutMobile({
  courses,
  content,
  progressService,
}: Props) {
  const [selected, setSelected] = useState(courses[0])

  return (
    <>
      <div className="features mx-auto w-full px-8 lg:hidden lg:py-28 lg:px-44">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-full lg:px-8">
          <h3 className="mt-2 py-8 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:mb-24">
            Courses
          </h3>
        </div>
      </div>

      {/* Accordions */}
      <div className="w-full px-4 pb-8">
        <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-2">
          {courses.map((course, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex w-full items-center justify-between border-b-2 bg-white px-4 py-6 text-left text-lg font-medium text-gray-900 focus:outline-none focus-visible:ring"
                    data-test={`mobile-course-${index}`}
                  >
                    <Image
                      className="h-8 w-auto sm:h-10"
                      src={`/images/home/course-icons/${course}.svg`}
                      alt="Cypress Logo"
                      height={62}
                      width={75}
                    />
                    <span>{content[course].title}</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-gray-900`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <HomeProgress
                      course={course}
                      content={content[course]}
                      progressService={progressService}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </>
  )
}
