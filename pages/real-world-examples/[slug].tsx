import fs from "fs"
import matter from "gray-matter"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Head from "next/head"
import dynamic from "next/dynamic"
import path from "path"
import { find, findIndex } from "lodash/fp"
import rehypeSlug from "rehype-slug"
import rehypePrism from "@mapbox/rehype-prism"
import remarkAdmonitions from "remark-admonitions"
import { progressService } from "../../machines/progressService"
import Layout from "../../components/Layout"
import LessonLayout from "@/components/Lesson/LessonLayout"
import apiLink from "../../components/Markdown/apiLink"
import { LessonTableOfContents, Lesson } from "common"
import {
  REAL_WORLD_EXAMPLES_PATH,
  allRealWorldExamplesFilePaths,
  getToCForMarkdown,
  getRealWorldExamplePath,
} from "../../utils/mdxUtils"
import rweJson from "../../data/real-world-examples.json"
import CopyToClipboard from "@/components/CopyToClipboard"

const CompleteLessonBtn = dynamic(
  () => import("../../components/Lesson/CompleteLessonBtn"),
  {
    ssr: false,
  }
)

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  //a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  //TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
  apiLink,
  pre: CopyToClipboard,
}

type Props = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  toc: LessonTableOfContents[]
  lessonData: Lesson
  sectionLessons: []
  nextLesson: string
  sectionTitle: string
  lessonPath: string
  rweJson: object
  sections: string[]
  section: string
}

export default function LessonPage({
  source,
  toc,
  lessonData,
  sectionLessons,
  nextLesson,
  lessonPath,
  rweJson,
  sections,
  section,
}: Props) {
  return (
    <Layout
      content={rweJson}
      courses={sections}
      progressService={progressService}
    >
      <Head>
        <title>{lessonData.title} | Real World Testing with Cypress</title>
        <meta name="description" content={lessonData.description} />
      </Head>

      <LessonLayout
        toc={toc}
        source={source}
        components={components}
        sectionLessons={sectionLessons}
        sectionTitle="Real World Examples"
        progressService={progressService}
        lessonPath={lessonPath}
        lessonData={lessonData}
        course="real-world-examples"
        section={section}
      />

      <CompleteLessonBtn
        progressService={progressService}
        nextLessonPath={nextLesson}
        lessonPath={lessonPath}
      />
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const sections = Object.keys(rweJson)
  const contentFilePath = getRealWorldExamplePath(
    path.join(REAL_WORLD_EXAMPLES_PATH, `/**/${params.slug}.mdx`)
  )

  const realWorldExampleDirectory = path.dirname(contentFilePath[0]).split("/")
  const section =
    realWorldExampleDirectory[realWorldExampleDirectory.length - 1]

  const source = fs.readFileSync(contentFilePath[0])
  const { content, data } = matter(source)
  const toc: LessonTableOfContents[] = getToCForMarkdown(content)
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkAdmonitions],
      // @ts-ignore
      rehypePlugins: [rehypeSlug, rehypePrism],
    },
    scope: data,
  })
  const lessonData = find({ slug: params.slug }, rweJson[section].lessons)
  const { title, lessons } = rweJson[section]

  const nextLessonIndex = findIndex({ slug: params.slug }, lessons) + 1
  let nextLesson

  if (nextLessonIndex < lessons.length) {
    nextLesson = lessons[nextLessonIndex].slug
  } else {
    nextLesson = null
  }

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      toc,
      lessonData,
      sectionLessons: lessons,
      nextLesson,
      lessonPath: `real-world-examples/${params.slug}`,
      rweJson,
      sections,
      section,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = allRealWorldExamplesFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((filePath) => {
      const [section, slug] = filePath.split("/")
      return { params: { slug, section } }
    })

  return {
    paths,
    fallback: false,
  }
}
