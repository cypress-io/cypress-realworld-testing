import { isLessonCompleted } from "../../utils/machineUtils"

export default function HomeCard({ lesson, section, progressService, index }) {
  return (
    <>
      <div className="relative max-w-xs mx-auto my-6 mx-4">
        <button
          data-test={`${section}-lesson-card-status-${index}`}
          type="button"
          className="absolute -top-4 xl:-left-6 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLessonCompleted(progressService, `${section}/${lesson.slug}`)
            ? "Completed"
            : "Upcoming"}
        </button>
        <div className="max-w-xs">
          <div
            key={lesson.title}
            className="flex flex-col border-2 rounded-lg overflow-hidden"
          >
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <a href={`${section}/${lesson.slug}`} className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">
                    {lesson.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {lesson.description}
                  </p>
                </a>
              </div>
              <div className="mt-10 flex justify-center">
                <a
                  href={`${section}/${lesson.slug}`}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Start Lesson
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
