import { find, findIndex, get, gte } from "lodash/fp"

export const getAllLessons = (learnJson: object, lessonPath) => {
  const [sectionSlug] = lessonPath.split("/")
  const section = getSection(learnJson, sectionSlug)
  return get("lessons", section)
}

export const findLesson = (learnJson: object, lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(learnJson, lessonPath)
  return find({ slug: lessonSlug }, lessons)
}

export const getChallenge = (
  learnJson: object,
  lessonPath: string,
  challengeIndex: number
) => {
  const lesson = findLesson(learnJson, lessonPath)
  return lesson.challenges[challengeIndex]
}

export const getLessonIndex = (learnJson: object, lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(learnJson, lessonPath)
  return findIndex({ slug: lessonSlug }, lessons)
}

export const getSection = (learnJson: object, lessonPath: string) => {
  const [sectionSlug] = lessonPath.split("/")
  return learnJson[sectionSlug]
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
