import Link from "next/link"
import Image from "next/image"
import { isLessonCompleted } from "../../utils/machineUtils"
import { Lesson } from "common"

type Props = {
  lessons: Lesson[]
  progressService: object
  course: string
}

export default function CourseNextLessonBtn({
  lessons,
  progressService,
  course,
}: Props) {
  const incompleteLessons = lessons
    .map((lesson) => {
      if (!isLessonCompleted(progressService, `${course}/${lesson.slug}`)) {
        return lesson.slug
      }
    })
    .filter((lesson) => lesson !== undefined)

  const buttonText = () => {
    if (!incompleteLessons.length) {
      return "Course Completed"
    }

    if (incompleteLessons.length === lessons.length) {
      return "Start Course"
    } else {
      return "Next Lesson"
    }
  }

  const buttonURL = () => {
    if (!incompleteLessons.length) {
      return "/"
    } else {
      return `${course}/${incompleteLessons[0]}`
    }
  }

  return (
    <Link href={buttonURL()}>
      <a
        data-test="next-lesson-button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {incompleteLessons.length === lessons.length && (
          <Image
            src="/images/course-page/course-play-icon.svg"
            alt="Play Icon"
            width={16}
            height={16}
          />
        )}

        <span className="ml-2">{buttonText()}</span>
      </a>
    </Link>
  )
}
