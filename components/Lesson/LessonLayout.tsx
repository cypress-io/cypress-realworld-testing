import { MDXRemote } from "next-mdx-remote"
import Script from "next/script"
import dynamic from "next/dynamic"
import { Lesson, LessonTableOfContents } from "common"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import LessonBreadcrumbs from "./LessonBreadcrumbs"
import LessonTOC from "./LessonTOC"

const LessonCourseProgress = dynamic(() => import("./LessonCourseProgress"), {
  ssr: false,
})

type Props = {
  toc: LessonTableOfContents[]
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  components: Record<string, React.ReactNode>
  sectionLessons: []
  sectionTitle: string
  progressService: object
  lessonPath: string
  lessonData: Lesson
  course: string
}

export default function LessonLayout({
  toc,
  source,
  components,
  sectionLessons,
  sectionTitle,
  progressService,
  lessonPath,
  lessonData,
  course,
}: Props) {
  return (
    <>
      <LessonBreadcrumbs
        lessonPath={lessonPath}
        sectionTitle={sectionTitle}
        lessonData={lessonData}
      />

      <div className="py-6">
        <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-screen-2xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            {/* Course Progress */}
            <div
              aria-label="Sidebar"
              className="sticky top-6 divide-y divide-gray-300"
            >
              <LessonCourseProgress
                course={course}
                lessons={sectionLessons}
                progressService={progressService}
              />
            </div>
          </div>

          {/* Main Content */}
          <main className="lg:col-span-9 xl:col-span-8">
            <div className="prose prose-lg prose-indigo mx-auto px-4 text-gray-500 sm:px-0">
              <MDXRemote {...source} components={components} />
            </div>
          </main>

          {/* Table of Contents */}
          <aside className="hidden xl:col-span-2 xl:block">
            <div className="sticky top-6 space-y-4">
              <LessonTOC navigation={toc} />
            </div>
          </aside>
        </div>
      </div>

      {/* Modal/Lightbox */}
      <div id="modal" data-test="lesson-modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <img src="" alt="" />
        </div>
      </div>

      <Script id="show-banner" strategy="afterInteractive">
        {`
          const images = document.querySelectorAll(".lesson-content img")
          const modal = document.getElementById("modal")
          const modalImg = document.querySelector("#modal .modal-content img")
          const modalClose = document.querySelector("#modal .modal-content .close")

          images.forEach((img) => {
            img.addEventListener("click", (event) => {
              let src = event.target.getAttribute("src")
              modalImg.src = src
              modal.style.display = "block"
            })
          })

          modalClose.addEventListener("click", () => {
            modal.style.display = "none"
          })

          // When the user clicks anywhere outside of the modal, close it
          window.addEventListener("click", (event) => {
            if (event.target == modal) {
              modal.style.display = "none"
            }
          })
        `}
      </Script>
    </>
  )
}
