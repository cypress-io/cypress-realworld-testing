import dynamic from "next/dynamic"

const RWEProgress = dynamic(() => import("./RWEProgress"), {
  ssr: false,
})

export default function RWETests({ sections, content, progressService }) {
  return (
    <div className="relative py-8 pb-32 overflow-hidden bg-white">
      {sections.map((section, index) => (
        <div key={section} data-test={`real-world-example-${index}`}>
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-5xl lg:px-8">
              <div className="max-w-xl px-4 mx-auto sm:px-6 lg:mx-0 lg:max-w-none lg:py-8">
                <div>
                  <div className="mt-6">
                    <h2
                      data-test={`example-title`}
                      className="flex mb-12 text-3xl font-extrabold tracking-tight text-gray-900"
                    >
                      <img
                        src="/images/real-world-examples/icons/circle-arrow-icon.svg"
                        alt=""
                        className="mr-4"
                      />
                      {content[section].title}
                    </h2>

                    <img
                      className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5"
                      alt="Website screenshot of Real World App"
                      src={content[section].image}
                    />

                    <p
                      data-test={`example-description`}
                      className="mt-16 text-lg text-gray-500"
                    >
                      {content[section].description}
                    </p>
                    <RWEProgress content={content[section]} />
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
