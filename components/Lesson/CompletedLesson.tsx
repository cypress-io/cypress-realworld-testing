import { CheckIcon } from "@heroicons/react/solid"

export default function CompletedLesson({ index }) {
  return (
    <>
      <span className="h-9 flex items-center">
        <span
          data-test={`lesson-complete-${index}`}
          className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800"
        >
          <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
        </span>
      </span>
    </>
  )
}
