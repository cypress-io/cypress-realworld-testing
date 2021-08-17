import LessonToc from "../../components/Lesson/LessonToc"
import LessonSteps from "../../components/Lesson/LessonSteps"
import NextLessonBtn from "../../components/Lesson/NextLessonBtn"
import { MDXRemote } from "next-mdx-remote"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function LessonLayout(props) {
  return (
    <div className="min-h-screen my-20">
      <div className="py-6">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Table of Content */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="sticky top-6">
              <p className="font-semibold mb-4">ON THIS PAGE</p>
              <nav aria-label="Sidebar" className="">
                <LessonToc navigation={props.toc} />
              </nav>
            </div>
          </div>

          {/* Content */}
          <main className="lesson-content lg:col-span-9 xl:col-span-7">
            <div className="relative pb-16 bg-white overflow-hidden">
              <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="prose prose-indigo prose-lg text-gray-500 mx-auto">
                  <MDXRemote {...props.source} components={props.components} />
                </div>
              </div>
            </div>
          </main>

          {/* Progress Steps */}
          <aside className="hidden xl:block xl:col-span-3">
            <div className="sticky top-6 space-y-4">
              <p className="font-semibold mb-6">{props.sectionTitle}</p>
              <LessonSteps sectionLessons={props.sectionLessons} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
