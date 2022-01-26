import dynamic from "next/dynamic"

const RWEProgress = dynamic(() => import("./RWEProgress"), {
  ssr: false,
})

export default function RWETests({ sections, content, progressService }) {
  return (
    <div className="relative overflow-hidden bg-white py-32">
      {sections.map((section, index) => (
        <div key={section} data-test={`real-world-example-${index}`}>
          {index % 2 === 0 ? (
            <div className="relative">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                  <div>
                    <div className="mt-6">
                      <h2
                        data-test={`example-title`}
                        className="text-3xl font-extrabold tracking-tight text-gray-900"
                      >
                        {content[section].title}
                      </h2>
                      <p
                        data-test={`example-description`}
                        className="mt-4 text-lg text-gray-500"
                      >
                        {content[section].description}
                      </p>
                      <RWEProgress content={content[section]} />
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={content[section].image}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-32">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
                  <div>
                    <div className="mt-6">
                      <h2
                        data-test={`example-title`}
                        className="text-3xl font-extrabold tracking-tight text-gray-900"
                      >
                        {content[section].title}
                      </h2>
                      <p
                        data-test={`example-description`}
                        className="mt-4 text-lg text-gray-500"
                      >
                        {content[section].description}
                      </p>
                      <RWEProgress content={content[section]} />
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
                  <div className="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
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
