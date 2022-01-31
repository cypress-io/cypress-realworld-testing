import { Lesson } from "common"

type Props = {
  index: number
  isCompleted: boolean
  lessons: Lesson[]
}

export default function ProgressLine({ index, isCompleted, lessons }: Props) {
  return (
    <>
      {index !== lessons.length - 1 ? (
        <div
          className={`absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 ${
            isCompleted ? "bg-indigo-600" : "bg-gray-300"
          }`}
          aria-hidden="true"
        />
      ) : null}
    </>
  )
}
