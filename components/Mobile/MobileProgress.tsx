import { CheckIcon } from "@heroicons/react/solid"
import { isLessonCompleted } from "../../utils/machineUtils"
import { Course } from "common"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  course: string
  content: Course
  progressService: object
}

export default function MobileProgress({
  course,
  content,
  progressService,
}: Props) {
  return (
    <nav
      role="navigation"
      aria-label="Progress"
      className="mt-4">
      <ol className="overflow-hidden">
        {content?.lessons.map((lesson, index) => (
          <li
            data-test={`lesson-${index}`}
            key={lesson.title}
            className={classNames(
              index !== content?.lessons.length - 1 ? "pb-4" : "",
              "relative"
            )}
          >
            {/* Solid Line that connects the checkmarks */}
            {index !== content?.lessons.length - 1 ? (
              <div
                className={`absolute top-4 left-2 -ml-px mt-0.5 h-full w-0.5 ${
                  isLessonCompleted(progressService, `${course}/${lesson.slug}`)
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
                aria-hidden="true"
              />
            ) : null}

            <div className="relative flex items-center group">
              {/* "completed" */}

              {isLessonCompleted(
                progressService,
                `${course}/${lesson.slug}`
              ) && (
                <span className="flex items-center h-9">
                  <span
                    data-test={`lesson-complete-${index}`}
                    className="relative z-10 flex items-center justify-center w-4 h-4 bg-indigo-600 rounded-full group-hover:bg-indigo-800"
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
                `${course}/${lesson.slug}`
              ) && (
                <span className="flex items-center h-9" aria-hidden="true">
                  <span
                    data-test={`lesson-upcoming-${index}`}
                    className="relative z-10 flex items-center justify-center w-4 h-4 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                  </span>
                </span>
              )}

              {/* Lesson Title */}
              <span className="flex flex-col min-w-0 ml-4">
                <span className="text-xs font-semibold tracking-wide uppercase">
                  <a href={`/${course}/${lesson.slug}`}>{lesson.title}</a>
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
