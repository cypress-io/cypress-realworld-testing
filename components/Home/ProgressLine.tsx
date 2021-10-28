export default function ProgressLine({ lessonCompleted }) {
  return (
    <div
      className={`${
        lessonCompleted ? "bg-indigo-600" : "border-gray-300"
      } -ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full `}
      aria-hidden="true"
    ></div>
  )
}
