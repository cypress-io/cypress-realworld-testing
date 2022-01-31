import { useActor } from "@xstate/react"

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
    <div data-test="complete-lesson-button" className="py-20">
      <a
        href={nextLessonPath ? nextLessonPath : "/"}
        className="mx-auto flex max-w-xl items-center justify-center rounded-md bg-teal-500 px-8 py-3 text-base font-medium text-white  md:py-4 md:px-10 md:text-lg"
        onClick={() => {
          progressSend({
            type: "COMPLETE_LESSON",
            id: lessonPath,
          })
        }}
      >
        {nextLessonPath ? "Next Lesson" : "Complete Course"}
      </a>
    </div>
  )
}
