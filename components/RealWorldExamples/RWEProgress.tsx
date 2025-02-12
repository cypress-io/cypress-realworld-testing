export default function RWEProgress({ content }) {
  return (
    <nav
      role="navigation"
      aria-label="Progress"
      className="mt-12">
      <p className="mb-8 font-bold text-indigo-500">
        {content?.lessons.length} Examples
      </p>

      <ol className="overflow-hidden">
        {content?.lessons.map((lesson, index) => (
          <a
            href={`/real-world-examples/${lesson.slug}`}
            data-test={`real-world-lesson-${index}`}
            key={index}
          >
            <li data-test={`lesson-${index}`} className="pb-10">
              <div className="relative flex items-start group">
                <span className="flex flex-col min-w-0">
                  <p className="mb-2 text-lg font-semibold tracking-wide text-gray-700 uppercase">
                    {lesson.title}
                  </p>

                  <span className="text-gray-500 text">
                    {lesson.description}
                  </span>
                </span>

                <img
                  src="/images/real-world-examples/icons/right-arrow.svg"
                  alt="right arrow icon"
                  className="absolute invisible right-2 top-4 md:visible"
                />
              </div>
              <div className="mt-4 border" />
            </li>
          </a>
        ))}
      </ol>
    </nav>
  )
}
