import { isLessonCompleted } from "../../utils/machineUtils"

export default function NextLessonBtn({ lessons, progressService, section }) {
  const incompleLessons = lessons
    .map((lesson) => {
      if (!isLessonCompleted(progressService, `${section}/${lesson.slug}`)) {
        return lesson.slug
      }
    })
    .filter((lesson) => lesson !== undefined)

  const buttonText = () => {
    if (!incompleLessons.length) {
      return "Course Completed"
    }

    if (incompleLessons.length === lessons.length) {
      return "Start Course"
    } else {
      return "Next Lesson"
    }
  }

  const buttonURL = () => {
    if (!incompleLessons.length) {
      return "/"
    } else {
      return `${section}/${incompleLessons[0]}`
    }
  }

  return (
    <div data-test="next-lesson-button" className="py-20">
      <a
        href={buttonURL()}
        className="mx-auto max-w-xl flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
      >
        {buttonText()}
      </a>
    </div>
  )
}
