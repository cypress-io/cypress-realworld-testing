import { LessonTableOfContents } from "../../types/common"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  navigation: LessonTableOfContents[]
}

export default function LessonTOC({ navigation }: Props) {
  return (
    <>
      <p className="mb-4 font-semibold">ON THIS PAGE</p>
      <nav data-test="toc-sidebar" className="space-y-1" aria-label="Sidebar">
        {navigation.map((item) => (
          <a
            data-test={item.slug}
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
            <span className="truncate">{item.content}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
