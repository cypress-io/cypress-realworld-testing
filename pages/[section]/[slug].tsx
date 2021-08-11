import fs from "fs"
import matter from "gray-matter"
import { useActor } from "@xstate/react"
import { progressService } from "../../machines/progressService"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
//import dynamic from 'next/dynamic'
import Head from "next/head"
import Link from "next/link"
import path from "path"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import LessonHero from "../../components/Lesson/LessonHero"
import LessonLayout from "../../components/Lesson/LessonLayout"
import LessonChallenge from "../../components/Lesson/LessonChallenge"
import { LessonTableOfContents } from "../../types/common"
import {
  CONTENT_PATH,
  allContentFilePaths,
  getToCForMarkdown,
} from "../../utils/mdxUtils"
import { find, findIndex } from "lodash/fp"
import rehypeSlug from "rehype-slug"
import learnJson from "../../learn.json"

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
}

type Props = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: {
    [key: string]: any
  }
  toc: LessonTableOfContents[]
  lessonData: {
    title: string
    slug: string
    description: string
    status: string
    challenges: object[]
  }
  sectionLessons: []
  nextLesson: string
}

export default function LessonPage({
  source,
  toc,
  lessonData,
  sectionLessons,
  nextLesson,
}: Props) {
  const router = useRouter()
  const { section, slug } = router.query
  const [progressState, progressSend] = useActor(progressService)

  const isLessonComplete = progressState.context.lessonsCompleted.includes(
    `${section}/${slug}`
  )

  return (
    <Layout>
      <Head>
        <title>{lessonData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LessonHero lessonData={lessonData} />
      <LessonChallenge />
      RESULTS: {isLessonComplete ? "COMPLETE" : "NOT"}
      <br />
      <div className="flex justify-center mx-auto">
        <h2>Quiz</h2>
        <br />
        <ul>
          <li
            onClick={() => {
              progressSend({
                type: "SUBMIT_ANSWER",
                id: "testing-your-first-application/todomvc-app-install-and-overview",
                challengeIndex: 0,
                userAnswerIndex: 0,
              })
            }}
          >
            Item one
          </li>
          <li
            onClick={() => {
              progressSend({
                type: "SUBMIT_ANSWER",
                id: "testing-your-first-application/todomvc-app-install-and-overview",
                challengeIndex: 0,
                userAnswerIndex: 1,
              })
            }}
          >
            Correct
          </li>
        </ul>
      </div>
      <LessonLayout
        toc={toc}
        source={source}
        components={components}
        sectionLessons={sectionLessons}
        nextLesson={nextLesson}
      />
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const contentFilePath = path.join(
    CONTENT_PATH,
    `${params.section}/${params.slug}.mdx`
  )
  const source = fs.readFileSync(contentFilePath)
  const { content, data } = matter(source)
  const toc: LessonTableOfContents[] = getToCForMarkdown(content)
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      // @ts-ignore
      rehypePlugins: [rehypeSlug],
    },
    scope: data,
  })
  const lessonData = find(
    { slug: params.slug },
    learnJson[params.section].children
  )
  const sectionLessons = learnJson[params.section].children
  const nextLessonIndex = findIndex({ slug: params.slug }, sectionLessons) + 1
  let nextLesson

  if (nextLessonIndex < sectionLessons.length) {
    nextLesson = sectionLessons[nextLessonIndex].slug
  } else {
    nextLesson = null
  }

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      toc,
      lessonData,
      sectionLessons,
      nextLesson,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = allContentFilePaths
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
