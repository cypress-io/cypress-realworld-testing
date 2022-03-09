type Props = {
  path: string
  isCompleted: boolean
}

export default function NextLessonBtn({ path, isCompleted }: Props) {
  return (
    <div className={`${isCompleted ? "" : "hidden"} py-20`}>
      <a
        href={path ? path : "/"}
        className="rounded-md bg-indigo-500 px-8 py-3 text-base font-medium text-white  md:py-4 md:px-10 md:text-lg"
        data-test="next-lesson-button"
      >
        {path ? "Next Lesson" : "Complete Course"}
      </a>
    </div>
  )
}
