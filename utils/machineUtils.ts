import { find, findIndex, get } from "lodash/fp"
import { Lesson } from "../types/common"

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

export const getSection = (learnData: object[], sectionSlug: string) =>
  find({ slug: sectionSlug }, learnData)

export const getSectionIndex = (learnData: object[], sectionSlug: string) =>
  findIndex({ slug: sectionSlug }, learnData)

export const findLesson = (lessons: object[], lessonSlug: string) =>
  find({ slug: lessonSlug }, lessons)

export const getLessonIndex = (lessons: object[], lessonSlug: string) =>
  findIndex({ slug: lessonSlug }, lessons)

export const getChallenge = (lesson: Lesson, challengeIndex: string) =>
  lesson.challenges[challengeIndex]
