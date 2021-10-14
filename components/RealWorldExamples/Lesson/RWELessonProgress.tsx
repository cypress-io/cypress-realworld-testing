import { CheckIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { isLessonCompleted } from "../../../utils/machineUtils"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function LessonSteps({
  sectionLessons,
  progressService,
  lessonPath,
}) {
  const [sectionSlug] = lessonPath.split("/")

  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {sectionLessons.map((lesson, index) => (
          <li
            key={lesson.title}
            className={classNames(
              index !== sectionLessons.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {/* Solid Line that connects the checkmarks */}
            {index !== sectionLessons.length - 1 ? (
              <div
                className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full ${
                  isLessonCompleted(
                    progressService,
                    `${sectionSlug}/${lesson.slug}`
                  )
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
                aria-hidden="true"
              />
            ) : null}

            <div className="relative flex items-start group">
              {/* "completed" */}

              {isLessonCompleted(
                progressService,
                `${sectionSlug}/${lesson.slug}`
              ) && (
                <span className="h-9 flex items-center">
                  <span
                    data-test={`lesson-complete-${index}`}
                    className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800"
                  >
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              )}

              {/* "upcoming" */}
              {!isLessonCompleted(
                progressService,
                `${sectionSlug}/${lesson.slug}`
              ) && (
                <span className="h-9 flex items-center" aria-hidden="true">
                  <span
                    data-test={`lesson-upcoming-${index}`}
                    className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                  </span>
                </span>
              )}

              {/* Lesson Title */}
              <span className="ml-4 min-w-0 flex flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase">
                  <Link href={`/real-world-examples/${lesson.slug}`}>
                    <a>{lesson.title}</a>
                  </Link>
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
