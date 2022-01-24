import Link from "next/link"
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
    <div className="py-20">
      <Link href={buttonURL()}>
        <a
          data-test="next-lesson-button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {buttonText()}
        </a>
      </Link>
    </div>
  )
}
