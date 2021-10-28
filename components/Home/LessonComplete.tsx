import { CheckIcon } from "@heroicons/react/solid"

export default function LessonComplete({ lesson }) {
  return (
    <>
      <div className="relative flex items-start group">
        <div className="h-9 flex items-center">
          <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
            <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </div>
        <div className="ml-4 min-w-0 flex flex-col">
          <div className="text-xs font-semibold tracking-wide uppercase">
            <a href={`testing-your-first-application/${lesson.slug}`}>
              {lesson.title}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
