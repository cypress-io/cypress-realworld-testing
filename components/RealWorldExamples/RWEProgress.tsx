export default function RWEProgress({ content }) {
  return (
    <nav aria-label="Progress" className="mt-12">
      <p className="mb-8 font-bold text-indigo-400">
        {content?.lessons.length} Examples
      </p>

      <ol className="overflow-hidden">
        {content?.lessons.map((lesson, index) => (
          <li
            data-test={`lesson-${index}`}
            key={lesson.title}
            className="pb-10"
          >
            <div className="group relative flex items-start">
              <span className="flex min-w-0 flex-col">
                <a
                  href={`/real-world-examples/${lesson.slug}`}
                  data-test={`real-world-lesson-${index}`}
                  className="mb-2 text-lg font-semibold uppercase tracking-wide text-gray-700"
                >
                  {lesson.title}
                </a>

                <span className="text text-gray-500">{lesson.description}</span>
              </span>

              <img
                src="/images/real-world-examples/icons/right-arrow.svg"
                alt="right arrow icon"
                className="absolute right-2 top-4"
              />
            </div>
            <div className="mt-4 border" />
          </li>
        ))}
      </ol>
    </nav>
  )
}
