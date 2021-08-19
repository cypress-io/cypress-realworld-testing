import { find, findIndex, get, gte } from "lodash/fp"
import { Lesson } from "../types/common"

export const getAllLessons = (progressState, lessonPath) => {
  const [sectionSlug] = lessonPath.split("/")
  const section = getSection(progressState.context.learnData, sectionSlug)

  return get("lessons", section)
}

export const findLesson = (lessons: object[], lessonSlug: string) =>
  find({ slug: lessonSlug }, lessons)

export const getChallenge = (lesson: Lesson, challengeIndex: string) =>
  lesson.challenges[challengeIndex]

export const getLessonIndex = (lessons: object[], lessonSlug: string) =>
  findIndex({ slug: lessonSlug }, lessons)

export const getSection = (learnData: object[], sectionSlug: string) =>
  find({ slug: sectionSlug }, learnData)

export const getSectionIndex = (learnData: object[], sectionSlug: string) =>
  findIndex({ slug: sectionSlug }, learnData)

export const isLessonCompleted = (progressState, lessonPath) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(progressState, lessonPath)

  return gte(findIndex({ slug: lessonSlug, status: "completed" }, lessons), 0)
}
