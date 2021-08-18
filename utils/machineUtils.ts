import { find, findIndex, get } from "lodash/fp"

export const isLessonCompleted = (progressState, lessonPath) => {
  const [sectionSlug, lessonSlug] = lessonPath.split("/")
  const section = getSection(progressState.context.learnData, sectionSlug)
  const sectionIndex = getSectionIndex(
    progressState.context.learnData,
    sectionSlug
  )
  const lessons = get("lessons", section)
  const lessonIndex = getLessonIndex(lessons, lessonSlug)

  if (
    progressState.context.learnData[sectionIndex].lessons[lessonIndex]
      .status === "completed"
  ) {
    return true
  }

  return false
}

export const getSection = (learnData, sectionSlug) =>
  find({ slug: sectionSlug }, learnData)

export const getSectionIndex = (learnData, sectionSlug) =>
  findIndex({ slug: sectionSlug }, learnData)

export const findLesson = (lessons, lessonSlug) =>
  find({ slug: lessonSlug }, lessons)

export const getLessonIndex = (lessons, lessonSlug) =>
  findIndex({ slug: lessonSlug }, lessons)

export const getChallenge = (lesson, challengeIndex) =>
  lesson.challenges[challengeIndex]
