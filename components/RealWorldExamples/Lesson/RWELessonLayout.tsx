import RWELessonBreadcrumbs from "./RWELessonBreadcrumbs"
import { MDXRemote } from "next-mdx-remote"
import Script from "next/script"
import dynamic from "next/dynamic"
import { Lesson, LessonTableOfContents } from "common"
import { MDXRemoteSerializeResult } from "next-mdx-remote"

const RWELessonSidebar = dynamic(() => import("./RWELessonSidebar"), {
  ssr: false,
})

type Props = {
  toc: LessonTableOfContents[]
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  components: Record<string, React.ReactNode>
  sectionLessons: []
  progressService: object
  lessonData: Lesson
}

export default function LessonLayout({
  toc,
  source,
  components,
  sectionLessons,
  progressService,
  lessonData,
}: Props) {
  return (
    <>
      <RWELessonBreadcrumbs lessonData={lessonData} />

      <div className="my-20 min-h-screen">
        <div className="py-6">
          <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-full lg:grid-cols-12 lg:gap-8 lg:px-8">
            {/* Table of Content */}
            <div className="lg:col-span-3 xl:col-span-2">
              <div className="sticky top-6">
                <p className="mb-4 font-semibold">ON THIS PAGE</p>
                <nav aria-label="Sidebar" className="">
                  <RWELessonSidebar navigation={toc} lessons={sectionLessons} />
                </nav>
              </div>
            </div>

            {/* Content */}
            <main className="lesson-content lg:col-span-9 xl:col-span-7">
              <div className="relative overflow-hidden bg-white pb-16">
                <div className="relative px-4 sm:px-6 lg:px-8">
                  <div className="prose prose-lg prose-indigo mx-auto text-gray-500">
                    <MDXRemote {...source} components={components} />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

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
