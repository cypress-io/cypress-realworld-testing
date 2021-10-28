import dynamic from "next/dynamic"
import { includes } from "lodash"
import HomeProgressNew from "../../components/Home/HomeProgressNew"
// const HomeProgressNew = dynamic(() => import("./HomeProgressNew"), {})

export default function HomeCourses({ content, completedLessons }) {
  const completed = completedLessons.map((lesson) => {
    return lesson.id
  })
  return (
    <div className="relative bg-white pt-16 pb-32 overflow-hidden">
      <div data-test={`course-testing-your-first-application`}>
        <div className="relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2
                    data-test={`course-title`}
                    className="text-3xl font-extrabold tracking-tight text-gray-900"
                  >
                    {content["testing-your-first-application"].title}
                  </h2>
                  <p
                    data-test={`course-description`}
                    className="mt-4 text-lg text-gray-500"
                  >
                    {content["testing-your-first-application"].description}
                  </p>
                  <div aria-label="Progress">
                    <ol role="list" className="overflow-hidden">
                      {content["testing-your-first-application"].lessons.map(
                        (lesson, index) => (
                          <HomeProgressNew
                            key={index}
                            content={content["testing-your-first-application"]}
                            lesson={lesson}
                            index={index}
                            lessonCompleted={includes(
                              completed,
                              `testing-your-first-application/${lesson.slug}`
                            )}
                          />
                        )
                      )}
                    </ol>
                  </div>
                  <div className="mt-6">
                    <a
                      href={content["testing-your-first-application"].slug}
                      className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={content["testing-your-first-application"].image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
