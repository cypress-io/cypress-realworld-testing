import path from "path"
import fs from "fs"
import slugify from "slugify"
import learnJson from "../data/courses.json"

Object.keys(learnJson).forEach((section) => {
  let { slug, title, lessons } = learnJson[section]
  slug = slugify(title, { lower: true })

  lessons.forEach((lesson) => {
    lesson.slug = slugify(lesson.title, { lower: true })
  })
})

fs.writeFileSync(
  path.join(process.cwd(), "learn.json"),
  JSON.stringify(learnJson, null, 2)
)
