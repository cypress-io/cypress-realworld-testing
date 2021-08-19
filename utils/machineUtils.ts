import { find, findIndex, get, gte } from "lodash/fp"

export const getAllLessons = (learnData: object[], lessonPath) => {
  const [sectionSlug] = lessonPath.split("/")
  const section = getSection(learnData, sectionSlug)
  return get("lessons", section)
}

export const findLesson = (learnData: object[], lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(learnData, lessonPath)
  return find({ slug: lessonSlug }, lessons)
}

export const getChallenge = (
  learnData: object[],
  lessonPath: string,
  challengeIndex: number
) => {
  const lesson = findLesson(learnData, lessonPath)
  return lesson.challenges[challengeIndex]
}

export const getLessonIndex = (learnData: object[], lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(learnData, lessonPath)
  return findIndex({ slug: lessonSlug }, lessons)
}

export const getSection = (learnData: object[], lessonPath: string) => {
  const [sectionSlug] = lessonPath.split("/")
  return find({ slug: sectionSlug }, learnData)
}

export const getSectionIndex = (learnData: object[], lessonPath: string) => {
  const [sectionSlug] = lessonPath.split("/")
  return findIndex({ slug: sectionSlug }, learnData)
}

export const isLessonCompleted = (learnData: object[], lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(learnData, lessonPath)
  return gte(findIndex({ slug: lessonSlug, status: "completed" }, lessons), 0)
}
