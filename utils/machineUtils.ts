import { find, findIndex } from "lodash/fp"

export const isLessonCompleted = (progressState, lessonPath) => {
  const [sectionSlug, lessonSlug] = lessonPath.split("/")
  const section = find({ slug: sectionSlug }, progressState.context.learnData)
  const sectionIndex = findIndex({ slug: sectionSlug }, progressState.context.learnData)
  const { lessons } = section
  const lessonIndex = findIndex({ slug: lessonSlug }, lessons)

  if (progressState.context.learnData[sectionIndex].lessons[lessonIndex].status === "completed") {
    return true
  }

  return false
}

export const getSection = (learnData, sectionSlug) => {
  return find({ slug: sectionSlug }, learnData)
}

export const getSectionIndex = (learnData, sectionSlug) => {
  return findIndex({ slug: sectionSlug }, learnData)
}

export const findLesson = (lessons, lessonSlug) => {
  return find({ slug: lessonSlug }, lessons)
}

export const getLessons = (section) => {
  const { lessons } = section
  return lessons
}

export const getLessonIndex = (lessons, lessonSlug) => {
  return findIndex({ slug: lessonSlug }, lessons)
}

export const getChallenge = (lesson, challengeIndex) => {
  return lesson.challenges[challengeIndex]
}