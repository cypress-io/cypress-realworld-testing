import LessonToc from "../../components/Lesson/LessonToc"
import LessonSteps from "../../components/Lesson/LessonSteps"
import { MDXRemote } from "next-mdx-remote"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function LessonLayout(props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-6 divide-y divide-gray-300"
            >
              Table of Contents:
              <LessonToc navigation={props.toc} />
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
            Content:
            <MDXRemote {...props.source} components={props.components} />
          </main>
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-6 space-y-4">
              Progress:
              <LessonSteps sectionLessons={props.sectionLessons} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
