import { find, findIndex } from "lodash/fp"

export const isLessonCompleted = (progressState, lessonPath) => {
  const [sectionSlug, lessonSlug] = lessonPath.split("/")  
  const section = getSection(progressState.context.learnData, sectionSlug)
  const sectionIndex = getSectionIndex(progressState.context.learnData, sectionSlug)
  const lessons = getLessons(section)
  const lessonIndex = getLessonIndex(lessons, lessonSlug)

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