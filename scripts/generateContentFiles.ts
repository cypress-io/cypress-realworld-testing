import path from "path"
import fs from "fs"
import coursesJson from "../data/courses.json"

const sections = Object.keys(coursesJson)

sections.map((section) => {
  const { lessons } = coursesJson[section]
  lessons.map((lesson) => {
    const fileData = `---
title: ${lesson.title}
---
# ${lesson.title}

## SubHeader
${lesson.description}

## Another SubHeader
${lesson.description}`

    fs.writeFile(
      path.join(
        process.cwd(),
        `/content/courses/${section}/${lesson.slug}.mdx`
      ),
      fileData,
      (err) => {
        if (err) {
          console.error(err)
          return
        }
      }
    )
  })
})
