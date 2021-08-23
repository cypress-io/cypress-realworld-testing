import { CheckIcon } from "@heroicons/react/solid"
import SectionCard from "./SectionCard"
import { isSectionCompleted } from "../../utils/machineUtils"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function SectionSteps({ lessons, progressService, lessonPath }) {
  const [sectionSlug] = lessonPath.split("/")

  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {lessons &&
          lessons.map((lesson, index) => (
            <li
              key={lesson.title}
              className={classNames(
                index !== lessons.length - 1 ? "pb-10" : "",
                "relative"
              )}
            >
              {/* Solid Line that connects the checkmarks */}
              {index !== lessons.length - 1 ? (
                <div
                  className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full ${
                    isSectionCompleted(
                      progressService.state.context.sectionsCompleted,
                      sectionSlug
                    )
                      ? "bg-indigo-600"
                      : "bg-gray-300"
                  }`}
                  aria-hidden="true"
                />
              ) : null}

              <div className="relative flex items-start group">
                {/* "Completed" */}
                {isSectionCompleted(
                  progressService.state.context.sectionsCompleted,
                  sectionSlug
                ) && (
                  <>
                    <span className="h-9 flex items-center">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                        <CheckIcon
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </>
                )}

                {/* "Current" */}
                {/* {lesson.status === "Current" && (
                  <>
                    <span className="h-9 flex items-center" aria-hidden="true">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                        <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                      </span>
                    </span>
                  </>
                )} */}

                {/* "Upcoming" */}
                {!isSectionCompleted(
                  progressService.state.context.sectionsCompleted,
                  sectionSlug
                ) && (
                  <>
                    <span className="h-9 flex items-center" aria-hidden="true">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                      </span>
                    </span>
                  </>
                )}
              </div>
              <SectionCard
                lesson={lesson}
                lessonPath={lessonPath}
                progressService={progressService}
              />
            </li>
          ))}
      </ol>
    </nav>
  )
}
