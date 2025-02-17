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
  section?: string
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
  section,
}: Props) {
  return (
    <>
      <LessonBreadcrumbs
        lessonPath={lessonPath}
        sectionTitle={sectionTitle}
        lessonData={lessonData}
      />

      <div className="py-6 pt-16">
        <div className="max-w-3xl mx-auto sm:px-6 lg:grid lg:max-w-screen-2xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            {/* Course Progress */}
            <div
              aria-label="Sidebar"
              className="sticky divide-y divide-gray-300 top-6"
            >
              <LessonCourseProgress
                course={course}
                lessons={sectionLessons}
                progressService={progressService}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 xl:col-span-8">
            <div className="px-4 mx-auto prose prose-lg text-gray-500 prose-indigo sm:px-0">
              <MDXRemote {...source} components={components} />
            </div>
          </div>

          {/* Table of Contents */}
          <aside className="hidden xl:col-span-2 xl:block">
            <div className="sticky space-y-4 top-6">
              <LessonTOC
                navigation={toc}
                lessonPath={lessonPath}
                section={section}
              />
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
          const images = document.querySelectorAll(".prose img")
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
