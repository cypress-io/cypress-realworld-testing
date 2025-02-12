export default function TutorialProgress({ content }) {
  return (
    <nav
      role="navigation"
      aria-label="Progress"
      className="mt-12">
      <p className="mb-8 font-bold text-indigo-400">
        {content?.lessons.length} Lessons
      </p>

      <ol className="overflow-hidden">
        {content?.lessons.map((lesson, index) => (
          <a
            href={`/tutorials/${lesson.slug}`}
            data-test={`tutorial-lesson-${index}`}
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
                  src="/images/tutorials/icons/right-arrow.svg"
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
