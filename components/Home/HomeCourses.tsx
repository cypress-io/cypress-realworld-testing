import dynamic from "next/dynamic"
import Link from "next/link"

const HomeProgress = dynamic(() => import("./HomeProgress"), {
  ssr: false,
})

export default function HomeCourses({ sections, content, progressService }) {
  return (
    <div className="relative bg-white pt-16 pb-32 overflow-hidden">
      {sections.map((section, index) => (
        <div key={section} data-test={`course-${index}`}>
          {index % 2 === 0 ? (
            <div className="relative">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                  <div>
                    <div className="mt-6">
                      <h2
                        data-test={`course-title`}
                        className="text-3xl font-extrabold tracking-tight text-gray-900"
                      >
                        {content[section].title}
                      </h2>
                      <p
                        data-test={`course-description`}
                        className="mt-4 text-lg text-gray-500"
                      >
                        {content[section].description}
                      </p>
                      <HomeProgress
                        section={section}
                        content={content[section]}
                        progressService={progressService}
                      />
                      <div className="mt-6">
                        <Link href={`/${content[section].slug}`}>
                          <a className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600">
                            Get started
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={content[section].image}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-24">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                  <div>
                    <div className="mt-6">
                      <h2
                        data-test={`course-title`}
                        className="text-3xl font-extrabold tracking-tight text-gray-900"
                      >
                        {content[section].title}
                      </h2>
                      <p
                        data-test={`course-description`}
                        className="mt-4 text-lg text-gray-500"
                      >
                        {content[section].description}
                      </p>
                      <HomeProgress
                        section={section}
                        content={content[section]}
                        progressService={progressService}
                      />
                      <div className="mt-6">
                        <Link href={`/${content[section].slug}`}>
                          <a className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600">
                            Get started
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                  <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={content[section].image}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
