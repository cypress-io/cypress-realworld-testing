import { CheckIcon } from "@heroicons/react/solid"

export default function LessonComplete({ lesson }) {
  return (
    <>
      <div className="relative flex items-start group">
        <span className="h-9 flex items-center" aria-hidden="true">
          <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
            <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
          </span>
        </span>
        <span className="ml-4 min-w-0 flex flex-col">
          <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
            <a href={`testing-your-first-application/${lesson.slug}`}>
              {lesson.title}
            </a>
          </span>
          {/* <span className="text-sm text-gray-500">
                      {lesson.description}
                    </span> */}
        </span>
      </div>
    </>
  )
}
