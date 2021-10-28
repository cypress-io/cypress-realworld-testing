import dynamic from "next/dynamic"
import { isLessonCompleted } from "../../utils/machineUtils"

const ProgressLine = dynamic(() => import("./ProgressLine"), {
  ssr: false,
})

const CompletedLesson = dynamic(() => import("./CompletedLesson"), {
  ssr: false,
})

const IncompleteLesson = dynamic(() => import("./IncompleteLesson"), {
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
            {/* Solid Line that connects the checkmarks */}
            <ProgressLine
              index={index}
              content={content}
              isCompleted={isLessonCompleted(
                progressService,
                `${section}/${lesson.slug}`
              )}
            />

            <div className="relative flex items-start group">
              {isLessonCompleted(
                progressService,
                `${section}/${lesson.slug}`
              ) && <CompletedLesson index={index} />}

              {!isLessonCompleted(
                progressService,
                `${section}/${lesson.slug}`
              ) && <IncompleteLesson index={index} />}

              {/* Lesson Title */}
              <span className="ml-4 min-w-0 flex flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase">
                  <a href={`${section}/${lesson.slug}`}>{lesson.title}</a>
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
