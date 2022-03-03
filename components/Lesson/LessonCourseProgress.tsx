import dynamic from "next/dynamic"
import { Lesson } from "common"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { isLessonCompleted } from "../../utils/machineUtils"
import "react-pro-sidebar/dist/css/styles.css"

type Props = {
  course: string
  lessons: Lesson[]
  progressService: object
}

const CompletedLesson = dynamic(() => import("../Progress/CompletedLesson"), {
  ssr: false,
})

const IncompleteLesson = dynamic(() => import("../Progress/IncompleteLesson"), {
  ssr: false,
})

const isCurrentPage = (lessonPath) => {
  return window.location.pathname === lessonPath
}

export default function LessonCourseProgress({
  course,
  lessons,
  progressService,
}: Props) {
  return (
    <div data-test="sidebar">
      <p className="mb-4 font-semibold">Course Progress</p>
      <ProSidebar>
        <Menu>
          {lessons.map((lesson, index) => (
            <div key={index}>
              {isCurrentPage(`/${course}/${lesson.slug}`) &&
                isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && (
                  <MenuItem icon={<CompletedLesson index={index} />}>
                    <a
                      data-test={`sidebar-toc-link-${index}`}
                      href={`/${course}/${lesson.slug}`}
                    >
                      {lesson.title}
                    </a>
                  </MenuItem>
                )}

              {isCurrentPage(`/${course}/${lesson.slug}`) &&
                !isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && (
                  <MenuItem icon={<IncompleteLesson index={index} />}>
                    <a
                      data-test={`sidebar-toc-link-${index}`}
                      href={`/${course}/${lesson.slug}`}
                    >
                      {lesson.title}
                    </a>
                  </MenuItem>
                )}

              {!isCurrentPage(`/${course}/${lesson.slug}`) &&
                isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && (
                  <MenuItem icon={<CompletedLesson index={index} />}>
                    <a
                      data-test={`sidebar-toc-link-${index}`}
                      href={`/${course}/${lesson.slug}`}
                    >
                      {lesson.title}
                    </a>
                  </MenuItem>
                )}

              {!isCurrentPage(`/${course}/${lesson.slug}`) &&
                !isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && (
                  <MenuItem icon={<IncompleteLesson index={index} />}>
                    <a
                      data-test={`sidebar-toc-link-${index}`}
                      href={`/${course}/${lesson.slug}`}
                    >
                      {lesson.title}
                    </a>
                  </MenuItem>
                )}
            </div>
          ))}
        </Menu>
      </ProSidebar>
    </div>
  )
}
