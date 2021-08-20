export default function NextLessonBtn({ path, isCompleted }) {
  return (
    <div className={`${isCompleted ? "" : "hidden"} py-20`}>
      <a
        href={path}
        className="mx-auto max-w-xl flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
      >
        Next Lesson
      </a>
    </div>
  )
}
