type Props = {
  path: string
  isCompleted: boolean
}

export default function NextLessonBtn({ path, isCompleted }: Props) {
  return (
    <div className={`${isCompleted ? "" : "hidden"} py-20`}>
      <a
        href={path ? path : "/"}
        className="px-8 py-3 text-base font-medium rounded-md text-white bg-jade-300  md:py-4 md:text-lg md:px-10"
        data-test="next-lesson-button"
      >
        {path ? "Next Lesson" : "Complete Course"}
      </a>
    </div>
  )
}
