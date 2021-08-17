import { findIndex } from "lodash/fp"

export const isLessonCompleted = (progressState, lessonPath) => {
  const lessonFound = findIndex({id: lessonPath, status: "completed"}, progressState.context.lessons)
  
  if (lessonFound !== -1) {
    return true
  } else {
    return false
  }
}