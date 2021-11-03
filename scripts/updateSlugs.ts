import path from "path"
import fs from "fs"
import slugify from "slugify"
import coursesJson from "../data/courses.json"

Object.keys(coursesJson).forEach((section) => {
  let { slug, title, lessons } = coursesJson[section]
  slug = slugify(title, { lower: true })

  lessons.forEach((lesson) => {
    lesson.slug = slugify(lesson.title, { lower: true })
  })
})

fs.writeFileSync(
  path.join(process.cwd(), "learn.json"),
  JSON.stringify(coursesJson, null, 2)
)
