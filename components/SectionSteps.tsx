/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from "@heroicons/react/solid"
import SectionCard from "./SectionCard"

const steps = [
  {
    name: "Create account",
    description: "Vitae sed mi luctus laoreet.",
    href: "#",
    status: "complete",
  },
  {
    name: "Profile information",
    description: "Cursus semper viverra facilisis et et some more.",
    href: "#",
    status: "current",
  },
  {
    name: "Business information",
    description: "Penatibus eu quis ante.",
    href: "#",
    status: "upcoming",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function SectionSteps(props) {
  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {props.lessons.map((lesson, index) => (
          <li
            key={lesson.name}
            className={classNames(
              index !== steps.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {lesson.status === "Completed" ? (
              <>
                {index !== props.lessons.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={lesson.href}
                  className="relative flex items-start group"
                >
                  <span className="h-9 flex items-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                      <CheckIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  {/* <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      {lesson.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {lesson.description}
                    </span>
                  </span> */}
                  <SectionCard lesson={lesson} />
                </a>
              </>
            ) : lesson.status === "Current" ? (
              <>
                {index !== props.lessons.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={lesson.href}
                  className="relative flex items-start group"
                  aria-current="step"
                >
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                      <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                    </span>
                  </span>
                  {/* <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-indigo-600">
                      {lesson.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {lesson.description}
                    </span>
                  </span> */}
                  <SectionCard lesson={lesson} />
                </a>
              </>
            ) : (
              <>
                {index !== props.lessons.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={lesson.href}
                  className="relative flex items-start group"
                >
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                    </span>
                  </span>
                  {/* <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                      {lesson.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {lesson.description}
                    </span>
                  </span> */}
                  <SectionCard lesson={lesson} />
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
