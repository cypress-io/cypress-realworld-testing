import { LessonTableOfContents } from "../../types/common"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  navigation: LessonTableOfContents[]
  lessonPath: string
  section?: string
}

export default function LessonTOC({ navigation, lessonPath, section }: Props) {
  const [sectionSlug, lessonSlug] = lessonPath.split("/")

  const isRWEExample = () => {
    return lessonPath.includes("real-world-examples")
  }

  return (
    <>
      <p className="mb-4 font-semibold">ON THIS PAGE</p>
      <nav data-test="toc-sidebar" className="space-y-1" aria-label="Sidebar">
        {navigation.map((item, index) => (
          <a
            data-test={`toc-link`}
            key={item.slug}
            href={`#${item.slug}`}
            className={classNames(
              item.current
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            <span>{item.content}</span>
          </a>
        ))}

        <a
          href={`https://github.com/cypress-io/cypress-realworld-testing/blob/main/content/${
            isRWEExample()
              ? `real-world-examples/${section}/${lessonSlug}.mdx`
              : `courses/${sectionSlug}/${lessonSlug}.mdx`
          }`}
          className="flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="ml-2">edit this page</span>
        </a>
      </nav>
    </>
  )
}
