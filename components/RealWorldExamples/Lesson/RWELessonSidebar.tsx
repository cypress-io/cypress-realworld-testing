import dynamic from "next/dynamic"
import { LessonTableOfContents, Lesson } from "../../../types/common"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { isLessonCompleted } from "../../../utils/machineUtils"
import "react-pro-sidebar/dist/css/styles.css"

type Props = {
  navigation: LessonTableOfContents[]
  lessons: Lesson[]
}

const CompletedLesson = dynamic(
  () => import("../../Progress/CompletedLesson"),
  {
    ssr: false,
  }
)

const IncompleteLesson = dynamic(
  () => import("../../Progress/IncompleteLesson"),
  {
    ssr: false,
  }
)

const isCurrentPage = (lessonPath) => {
  return window.location.pathname === lessonPath
}

export default function LessonSidebar({ navigation, lessons }: Props) {
  return (
    <div data-test="sidebar">
      <ProSidebar>
        <Menu>
          {lessons.map((lesson, index) => (
            <div key={index}>
              {!isCurrentPage(`/real-world-examples/${lesson.slug}`) && (
                <MenuItem>
                  <a
                    data-test={`real-world-lesson-${index}`}
                    href={`/real-world-examples/${lesson.slug}`}
                  >
                    {lesson.title}
                  </a>
                </MenuItem>
              )}

              {isCurrentPage(`/real-world-examples/${lesson.slug}`) && (
                <SubMenu title={lesson.title} defaultOpen={true}>
                  {navigation.map((item) => (
                    <MenuItem key={item.slug}>
                      <a
                        data-test="sidebar-submenu-toc-link"
                        href={`#${item.slug}`}
                      >
                        {item.content}
                      </a>
                    </MenuItem>
                  ))}
                </SubMenu>
              )}
            </div>
          ))}
        </Menu>
      </ProSidebar>
    </div>
  )
}
