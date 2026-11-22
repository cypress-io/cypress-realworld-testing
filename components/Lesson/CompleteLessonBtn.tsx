import { useActor } from "@xstate/react"
import { fsLabel } from "../../utils/fullstory"
import { navigateAfterProgressEvents } from "./navigateAfterProgressEvents"

type Props = {
  nextLessonPath: string
  progressService: any
  lessonPath: string
}

export default function NextLessonBtn({
  nextLessonPath,
  progressService,
  lessonPath,
}: Props) {
  const [, progressSend] = useActor(progressService)

  return (
    <div data-test="complete-lesson-button" className="py-20 px-4">
      <a
        href={nextLessonPath ? nextLessonPath : "/"}
        {...fsLabel(
          nextLessonPath
            ? "Learn Lesson - Complete Lesson - Next Lesson"
            : "Learn Lesson - Complete Lesson - Finish"
        )}
        className="mx-auto flex max-w-xl items-center justify-center rounded-md bg-indigo-500 px-8 py-3 text-base font-medium text-white  md:py-4 md:px-10 md:text-lg"
        onClick={(event) => {
          progressSend({
            type: "COMPLETE_LESSON",
            id: lessonPath,
          })
          navigateAfterProgressEvents(event)
        }}
      >
        {nextLessonPath ? "Next Lesson" : "Complete"}
      </a>
    </div>
  )
}
