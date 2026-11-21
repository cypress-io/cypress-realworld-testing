import { useActor } from "@xstate/react"
import {
  fsLabel,
  trackFullStoryEventBeforeNavigating,
} from "../../utils/fullstory"

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
          const tracked = trackFullStoryEventBeforeNavigating(
            "Lesson Completed",
            { lessonId: lessonPath }
          )
          // A plain click navigates away, which can drop a queued event, so hold
          // the navigation until FullStory has the event (capped at 500ms). A
          // modifier click opens a new tab and leaves this page alone.
          const isPlainClick =
            event.button === 0 &&
            !event.metaKey &&
            !event.ctrlKey &&
            !event.shiftKey &&
            !event.altKey
          if (!isPlainClick) return
          event.preventDefault()
          const href = event.currentTarget.href
          tracked.then(() => window.location.assign(href))
        }}
      >
        {nextLessonPath ? "Next Lesson" : "Complete"}
      </a>
    </div>
  )
}
