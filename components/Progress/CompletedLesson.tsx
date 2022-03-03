import { CheckIcon } from "@heroicons/react/solid"

type Props = {
  index: number
}

export default function CompletedLesson({ index }: Props) {
  return (
    <>
      <span className="flex h-9 items-center">
        <span
          data-test={`lesson-complete-${index}`}
          className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 group-hover:bg-indigo-800"
        >
          <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      </span>
    </>
  )
}
