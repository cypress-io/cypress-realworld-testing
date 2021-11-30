import dynamic from "next/dynamic"
import CourseProgress from "./CourseProgress"

const CourseNextLessonBtn = dynamic(() => import("./CourseNextLessonBtn"), {
  ssr: false,
})

export default function CourseContent({ lessons, progressService, course }) {
  const stats = [{ label: "Lessons", value: lessons.length }]

  return (
    <>
      <hr />
      <div className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative z-10">
              <div className="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
                {/* Stats course */}
                <div className="mt-10">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                    {stats.map((stat) => (
                      <div key={stat.label} className=" pt-6">
                        <dd className="text-3xl font-extrabold tracking-tight text-teal-600 text-6xl">
                          {stat.value}
                        </dd>
                        <dt className="text-lg font-bold text-teal-600">
                          {stat.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                <CourseProgress
                  course={course}
                  lessons={lessons}
                  progressService={progressService}
                />

                <CourseNextLessonBtn
                  lessons={lessons}
                  progressService={progressService}
                  course={course}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
