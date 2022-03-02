import Link from "next/link"
import { HomeIcon } from "@heroicons/react/solid"
import { Lesson } from "common"

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
]

type Props = {
  lessonData: Lesson
}

export default function RWELessonBreadcrumbs({ lessonData }: Props) {
  return (
    <nav
      className="flex border-b border-gray-200 bg-white"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
      >
        <li className="flex">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </a>
            </Link>
          </div>
        </li>

        {/* Section */}
        <li className="flex">
          <div className="flex items-center">
            <svg
              className="h-full w-6 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <Link href="/tutorials">
              <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Tutorials
              </a>
            </Link>
          </div>
        </li>

        {/* Lesson */}
        <li className="flex">
          <div className="flex items-center">
            <svg
              className="h-full w-6 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <p className="ml-4 text-sm font-medium text-gray-500">
              {lessonData.title}
            </p>
          </div>
        </li>
      </ol>
    </nav>
  )
}
