import dynamic from "next/dynamic"
import Link from "next/link"
import { isLessonCompleted } from "../../utils/machineUtils"
import { Course } from "common"
import { CheckIcon } from "@heroicons/react/outline"

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
  course: string
  content: Course
  progressService: object
}

export default function HomeProgress({
  course,
  content,
  progressService,
}: Props) {
  return (
    <>
      <nav aria-label="Progress" className="" data-test="course-progress">
        <div className="what-you-will-learn my-8 rounded bg-jade-50 p-8 lg:mb-8 lg:mt-0">
          <img
            src={`/images/home/course-icons/book-icon.svg`}
            alt="book icon"
          />
          <p className="py-6 font-bold text-gray-800">
            IN THIS COURSE YOU&apos;LL LEARN
          </p>

          <div className="font-normal text-gray-600">
            <dl className="">
              {content.learnFeatures.map((feature, index) => (
                <div key={index} className="relative mb-6">
                  <dt>
                    <CheckIcon
                      className="absolute h-6 w-6 text-gray-500"
                      aria-hidden="true"
                    />
                    <p className="ml-9 text-lg font-medium leading-6 text-gray-600">
                      {feature}
                    </p>
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ol className="overflow-hidden">
          {content?.lessons.map((lesson, index) => (
            <li
              data-test={`lesson-${index}`}
              key={lesson.title}
              className="relative mb-6 rounded border py-4 pl-4 lg:py-6"
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
                <span className="ml-2 flex min-w-0 flex-row lg:ml-4">
                  <span className="font-normal">
                    <Link href={`/${course}/${lesson.slug}`}>
                      <a data-test={`lesson-progress-link-${index}`}>
                        {lesson.title}
                      </a>
                    </Link>
                  </span>
                </span>
                <img
                  className="absolute right-8 hidden lg:inline-block"
                  src={`/images/home/course-icons/course-play-icon.svg`}
                  alt=""
                />
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
