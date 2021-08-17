import {includes} from "lodash/fp"

export const isLessonCompleted = (progressState, lessonPath) => {
  return includes(lessonPath, progressState.context.lessonsCompleted)
}