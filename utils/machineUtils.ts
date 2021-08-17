import { gte, findIndex } from "lodash/fp"

export const isLessonCompleted = (progressState, lessonPath) => {
  return gte(findIndex({id: lessonPath, status: "completed"}, progressState.context.lessons), 0)
}