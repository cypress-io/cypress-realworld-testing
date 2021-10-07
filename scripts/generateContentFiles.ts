import path from "path"
import fs from "fs"
import learnJson from "../learn.json"

const sections = Object.keys(learnJson)

sections.map((section) => {
  const { lessons } = learnJson[section]
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
