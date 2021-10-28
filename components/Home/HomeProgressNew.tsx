import dynamic from "next/dynamic"
import { CheckIcon } from "@heroicons/react/solid"
import LessonComplete from "./LessonComplete"
import LessonIncomplete from "./LessonIncomplete"
const ProgressLine = dynamic(() => import("./ProgressLine"), {
  ssr: false,
})

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function HomeProgressNew({
  content,
  lesson,
  index,
  lessonCompleted,
}) {
  return (
    <li
      className={classNames(
        index !== content?.lessons.length - 1 ? "pb-10" : "",
        "relative"
      )}
    >
      <ProgressLine lessonCompleted={lessonCompleted} />

      {lessonCompleted && index !== content?.lessons.length - 1 && (
        <LessonComplete lesson={lesson} />
      )}

      {!lessonCompleted && index !== content?.lessons.length - 1 && (
        <LessonIncomplete lesson={lesson} />
      )}
    </li>
  )
}
