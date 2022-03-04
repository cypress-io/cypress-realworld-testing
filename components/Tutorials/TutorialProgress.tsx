export default function TutorialProgress({ content }) {
  return (
    <nav aria-label="Progress" className="mt-12">
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
              <div className="group relative flex items-start">
                <span className="flex min-w-0 flex-col">
                  <p className="mb-2 text-lg font-semibold uppercase tracking-wide text-gray-700">
                    {lesson.title}
                  </p>

                  <span className="text text-gray-500">
                    {lesson.description}
                  </span>
                </span>

                <img
                  src="/images/tutorials/icons/right-arrow.svg"
                  alt="right arrow icon"
                  className="invisible absolute right-2 top-4 md:visible"
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
