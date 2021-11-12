import Link from "next/link"
import dynamic from "next/dynamic"
import { LessonTableOfContents, Lessons } from "../../types/common"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { isLessonCompleted } from "../../utils/machineUtils"
import "react-pro-sidebar/dist/css/styles.css"

type Props = {
  navigation: LessonTableOfContents[]
  lessons: Lessons[]
  course: string
  progressService: object
}

const ProgressLine = dynamic(() => import("../Progress/ProgressLine"), {
  ssr: false,
})

const CompletedLesson = dynamic(() => import("../Progress/CompletedLesson"), {
  ssr: false,
})

const IncompleteLesson = dynamic(() => import("../Progress/IncompleteLesson"), {
  ssr: false,
})

const isCurrentPage = (lessonPath) => {
  return window.location.pathname === lessonPath
}

export default function LessonSidebar({
  navigation,
  course,
  lessons,
  progressService,
}: Props) {
  console.log(lessons)
  return (
    <>
      <ProSidebar>
        <Menu>
          {lessons.map((lesson, index) => (
            <div key={index}>
              {!isCurrentPage(`/${course}/${lesson.slug}`) &&
                isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && (
                  <Link href={`/${course}/${lesson.slug}`} passHref>
                    <MenuItem icon={<CompletedLesson index={index} />}>
                      {lesson.title}
                    </MenuItem>
                  </Link>
                )}

              {!isCurrentPage(`/${course}/${lesson.slug}`) &&
                !isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && (
                  <Link href={`/${course}/${lesson.slug}`} passHref>
                    <MenuItem icon={<IncompleteLesson index={index} />}>
                      {lesson.title}
                    </MenuItem>
                  </Link>
                )}

              {isCurrentPage(`/${course}/${lesson.slug}`) &&
                isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && (
                  <SubMenu
                    title={lesson.title}
                    defaultOpen={true}
                    icon={<CompletedLesson index={index} />}
                  >
                    {navigation.map((item) => (
                      <MenuItem key={item.slug}>
                        <Link data-test={item.slug} href={`#${item.slug}`}>
                          <a>{item.content}</a>
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}

              {isCurrentPage(`/${course}/${lesson.slug}`) &&
                !isLessonCompleted(
                  progressService,
                  `${course}/${lesson.slug}`
                ) && (
                  <SubMenu
                    title={lesson.title}
                    defaultOpen={true}
                    icon={<IncompleteLesson index={index} />}
                  >
                    {navigation.map((item) => (
                      <MenuItem key={item.slug}>
                        <Link data-test={item.slug} href={`#${item.slug}`}>
                          <a>{item.slug}</a>
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
            </div>
          ))}
        </Menu>
      </ProSidebar>
    </>
  )
}
