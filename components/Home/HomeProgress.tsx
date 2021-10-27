import { CheckIcon } from "@heroicons/react/solid"
// import CompletedLine from "./CompletedLine"
// import IncompleteLine from "./IncompleteLine"
import { isLessonCompleted } from "../../utils/machineUtils"

import dynamic from "next/dynamic"

const CompletedLine = dynamic(() => import("./CompletedLine"), {
  ssr: false,
})
const IncompleteLine = dynamic(() => import("./IncompleteLine"), {
  ssr: false,
})

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function HomeProgress({ section, content, progressService }) {
  return (
    <nav aria-label="Progress" className="mt-12">
      <ol className="overflow-hidden">
        {content?.lessons.map((lesson, index) => (
          <li
            data-test={`lesson-${index}`}
            key={lesson.title}
            className={classNames(
              index !== content?.lessons.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {isLessonCompleted(
              progressService,
              `${section}/${lesson.slug}`
            ) && <CompletedLine />}

            {!isLessonCompleted(
              progressService,
              `${section}/${lesson.slug}`
            ) && <IncompleteLine />}

            <div className="relative flex items-start group">
              {/* "completed" */}

              {isLessonCompleted(
                progressService,
                `${section}/${lesson.slug}`
              ) && (
                <div className="h-9 flex items-center">
                  <div
                    data-test={`lesson-complete-${index}`}
                    className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800"
                  >
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}

              {/* "upcoming" */}
              {!isLessonCompleted(
                progressService,
                `${section}/${lesson.slug}`
              ) && (
                <div className="h-9 flex items-center" aria-hidden="true">
                  <div
                    data-test={`lesson-upcoming-${index}`}
                    className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <div className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                  </div>
                </div>
              )}

              {/* Lesson Title */}
              <div className="ml-4 min-w-0 flex flex-col">
                <div className="text-xs font-semibold tracking-wide uppercase">
                  <a href={`${section}/${lesson.slug}`}>{lesson.title}</a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
