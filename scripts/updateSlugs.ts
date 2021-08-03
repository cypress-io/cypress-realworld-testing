import path from "path"
import fs from "fs"
import slugify from "slugify"
import learnJson from "../learn.json"

Object.keys(learnJson).forEach((section) => {
  let { slug, title, children } = learnJson[section]
  slug = slugify(title, { lower: true })

  children.forEach((lesson) => {
    lesson.slug = slugify(lesson.title, { lower: true })
  })
})

fs.writeFileSync(
  path.join(process.cwd(), "learn.json"),
  JSON.stringify(learnJson, null, 2)
)
