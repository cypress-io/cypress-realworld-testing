import { find, findIndex, get, gte } from "lodash/fp"

export const getAllLessons = (coursesJson: object, lessonPath) => {
  const [sectionSlug] = lessonPath.split("/")
  const course = getCourse(coursesJson, sectionSlug)
  return get("lessons", course)
}

export const findLesson = (coursesJson: object, lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(coursesJson, lessonPath)
  return find({ slug: lessonSlug }, lessons)
}

export const getChallenge = (
  coursesJson: object,
  lessonPath: string,
  challengeIndex: number
) => {
  const lesson = findLesson(coursesJson, lessonPath)
  return lesson.challenges[challengeIndex]
}

export const getLessonIndex = (coursesJson: object, lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(coursesJson, lessonPath)
  return findIndex({ slug: lessonSlug }, lessons)
}

export const getCourse = (coursesJson: object, lessonPath: string) => {
  const [sectionSlug] = lessonPath.split("/")
  return coursesJson[sectionSlug]
}

export const isLessonCompleted = (progressService, lessonPath) => {
  return gte(
    findIndex(
      { id: lessonPath, status: "completed" },
      progressService.state.context.lessons
    ),
    0
  )
}

export const isSectionCompleted = (sectionsCompleted, sectionSlug) => {
  return sectionsCompleted.includes(sectionSlug)
}

type ProgressLesson = { id: string; status: string }

const isCourseDone = (
  coursesJson: object,
  courseSlug: string,
  lessons: ProgressLesson[] = []
) => {
  const course = coursesJson[courseSlug]
  if (!course?.lessons?.length) return false
  const done = new Set(
    lessons.filter((l) => l.status === "completed").map((l) => l.id)
  )
  return course.lessons.every((lesson) =>
    done.has(`${courseSlug}/${lesson.slug}`)
  )
}

/**
 * The slug of the course that `lessonPath`'s transition just finished: every
 * lesson in it is complete now, and wasn't before. Undefined otherwise.
 */
export const courseCompletedBy = (
  coursesJson: object,
  lessonPath: string,
  previousLessons: ProgressLesson[] = [],
  nextLessons: ProgressLesson[] = []
): string | undefined => {
  const [courseSlug] = (lessonPath ?? "").split("/")
  if (!courseSlug) return undefined
  return isCourseDone(coursesJson, courseSlug, nextLessons) &&
    !isCourseDone(coursesJson, courseSlug, previousLessons)
    ? courseSlug
    : undefined
}

/** True when `lessonPath` is complete in `nextLessons` and wasn't in `previousLessons`. */
export const lessonCompletedBy = (
  lessonPath: string,
  previousLessons: ProgressLesson[] = [],
  nextLessons: ProgressLesson[] = []
): boolean => {
  const done = (lessons: ProgressLesson[]) =>
    lessons.some((l) => l.id === lessonPath && l.status === "completed")
  return !!lessonPath && done(nextLessons) && !done(previousLessons)
}
