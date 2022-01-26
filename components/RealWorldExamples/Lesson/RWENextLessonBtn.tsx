type Props = {
  path: string
}

export default function NextLessonBtn({ path }: Props) {
  return (
    <div data-test="next-lesson-button" className="py-20">
      <a
        href={path ? path : "/real-world-examples"}
        className="mx-auto flex max-w-xl items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
      >
        {path ? "Next Example" : "Real World Examples"}
      </a>
    </div>
  )
}
