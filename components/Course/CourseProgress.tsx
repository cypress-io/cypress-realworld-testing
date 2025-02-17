import dynamic from "next/dynamic"
import Link from "next/link"
import { isLessonCompleted } from "../../utils/machineUtils"
import { Lesson } from "common"

const CompletedLesson = dynamic(() => import("../Progress/CompletedLesson"), {
  ssr: false,
})

const IncompleteLesson = dynamic(() => import("../Progress/IncompleteLesson"), {
  ssr: false,
})

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  lessons: Lesson[]
  course: string
  progressService: object
}

export default function CourseProgress({
  lessons,
  progressService,
  course,
}: Props) {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-gray-700">
        {lessons.length} Lessons
      </h2>

      <nav 
        role="navigation" 
        aria-label="Progress" 
        className="mt-12" 
        data-test="course-steps">
        <ol className="overflow-hidden">
          {lessons.map((lesson, index) => (
            <li
              data-test={`lesson-${index}`}
              key={lesson.title}
              className={classNames(
                index !== lessons.length - 1 ? "pb-10" : "",
                "relative"
              )}
            >
              <div className="relative flex items-center">
                {isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && <CompletedLesson index={index} />}

                {!isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && <IncompleteLesson index={index} />}

                {/* Lesson Title */}
                <span className="flex flex-col min-w-0 ml-4">
                  <span className="text-xs font-semibold tracking-wide uppercase">
                    <Link href={`/${course}/${lesson.slug}`}>
                      <a data-test={`lesson-progress-link-${index}`}>
                        {lesson.title}
                      </a>
                    </Link>
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
