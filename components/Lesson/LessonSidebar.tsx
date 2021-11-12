import { LessonTableOfContents } from "../../types/common"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import Link from "next/link"
import "react-pro-sidebar/dist/css/styles.css"

type Props = {
  navigation: LessonTableOfContents[]
  lessons: []
  course: string
}

const isCurrentPage = (lessonPath) => {
  return window.location.pathname === lessonPath
}

export default function LessonSidebar({ navigation, course, lessons }: Props) {
  return (
    <>
      <ProSidebar>
        <Menu iconShape="circle">
          {lessons.map((lesson, index) => (
            <div key={index}>
              {!isCurrentPage(`/${course}/${lesson.slug}`) && (
                <Link href={`/${course}/${lesson.slug}`} passHref>
                  <MenuItem>{lesson.title}</MenuItem>
                </Link>
              )}

              {isCurrentPage(`/${course}/${lesson.slug}`) && (
                <SubMenu title={lesson.title}>
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

      {/* <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar> */}
    </>
  )
}
