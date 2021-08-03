const path = require("path")
const fs = require("fs")
const learnJson = require("../learn.json")

const sections = Object.keys(learnJson)

sections.map((section) => {
  const { children } = learnJson[section]
  children.map((lesson) => {
    const fileData = `---\ntitle: ${lesson.title}\n---\n\n${lesson.title}`

    fs.writeFile(
      path.join(process.cwd(), `/content/${section}/${lesson.slug}.mdx`),
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
