import dynamic from "next/dynamic"
import Link from "next/link"

const MobileProgress = dynamic(() => import("./MobileProgress"), {
  ssr: false,
})

type Props = {
  courses: string[]
  content: object
  progressService: object
}

export default function Courses({ courses, content, progressService }: Props) {
  return (
    <div className="relative overflow-hidden bg-white">
      {courses.map((course, index) => (
        <div key={course} data-test={`course-${index}`}>
          <div className="relative">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                <div>
                  <div className="mt-6">
                    <Link href={`/${content[course].slug}`}>
                      <a
                        data-test={`course-title`}
                        className="text-base font-extrabold tracking-tight text-gray-900"
                      >
                        {content[course].title}
                      </a>
                    </Link>
                    <MobileProgress
                      course={course}
                      content={content[course]}
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
