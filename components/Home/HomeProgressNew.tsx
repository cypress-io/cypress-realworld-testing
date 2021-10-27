/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from "@heroicons/react/solid"
import { isLessonCompleted } from "../../utils/machineUtils"
import { includes } from "lodash"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function HomeProgressNew({
  content,
  lesson,
  index,
  lessonCompleted,
}) {
  // console.table(completed)

  // completed.map((lesson) => {
  //   console.log(
  //     includes(
  //       lesson,
  //       "testing-your-first-application/todomvc-app-install-and-overview"
  //     )
  //   )
  // })

  // console.log(
  //   includes(
  //     completed,
  //     "testing-your-first-application/todomvc-app-install-and-overview"
  //   )
  // )

  return (
    <li
      className={classNames(
        index !== content?.lessons.length - 1 ? "pb-10" : "",
        "relative"
      )}
    >
      {lessonCompleted ? (
        <>
          {index !== content?.lessons.length - 1 ? (
            <div
              className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
              aria-hidden="true"
            />
          ) : null}
          <div className="relative flex items-start group">
            <span className="h-9 flex items-center">
              <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </span>
            </span>
            <span className="ml-4 min-w-0 flex flex-col">
              <span className="text-xs font-semibold tracking-wide uppercase">
                <a href={`testing-your-first-application/${lesson.slug}`}>
                  {lesson.title}
                </a>
              </span>
              {/* <span className="text-sm text-gray-500">
                      {lesson.description}
                    </span> */}
            </span>
          </div>
        </>
      ) : !lessonCompleted ? (
        <>
          {index !== content?.lessons.length - 1 ? (
            <div
              className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
              aria-hidden="true"
            />
          ) : null}
          <div className="relative flex items-start group">
            <span className="h-9 flex items-center" aria-hidden="true">
              <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
              </span>
            </span>
            <span className="ml-4 min-w-0 flex flex-col">
              <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                <a href={`testing-your-first-application/${lesson.slug}`}>
                  {lesson.title}
                </a>
              </span>
              {/* <span className="text-sm text-gray-500">
                      {lesson.description}
                    </span> */}
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
    </li>
  )
}
