type Props = {
  index: number
}

export default function IncompleteLesson({ index }: Props) {
  return (
    <>
      <span className="flex h-9 items-center" aria-hidden="true">
        <span
          data-test={`lesson-upcoming-${index}`}
          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
        </span>
      </span>
    </>
  )
}
