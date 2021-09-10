import dynamic from "next/dynamic"

const LessonSteps = dynamic(() => import("./LessonSteps"), {
  ssr: false,
})

export default function Courses({ sections, content, progressService }) {
  return (
    <div className="relative bg-white overflow-hidden">
      {sections.map((section, index) => (
        <div key={section} data-test={`course-${index}`}>
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div className="mt-6">
                    <h2
                      data-test={`course-title`}
                      className="text-base font-extrabold tracking-tight text-gray-900"
                    >
                      {content[section].title}
                    </h2>
                    <LessonSteps
                      section={section}
                      content={content[section]}
                      progressService={progressService}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
