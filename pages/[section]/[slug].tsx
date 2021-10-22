import fs from "fs"
import matter from "gray-matter"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Head from "next/head"
import dynamic from "next/dynamic"
import path from "path"
import { find, findIndex } from "lodash/fp"
import { useActor } from "@xstate/react"
import rehypeSlug from "rehype-slug"
import rehypePrism from "@mapbox/rehype-prism"
import { progressService } from "../../machines/progressService"
import Layout from "../../components/Layout"
import LessonHero from "../../components/Lesson/LessonHero"
import LessonLayout from "../../components/Lesson/LessonLayout"
import MCChallenge from "../../components/Lesson/MultipleChoiceChallenge"
import apiLink from "../../components/Markdown/apiLink"

const NextLessonBtn = dynamic(
  () => import("../../components/Lesson/NextLessonBtn"),
  {}
)

const CompleteLessonBtn = dynamic(
  () => import("../../components/Lesson/CompleteLessonBtn"),
  {}
)

const SkipChallenge = dynamic(
  () => import("../../components/Lesson/SkipChallenge"),
  {}
)

import {
  LessonTableOfContents,
  MultipleChoiceChallenge,
} from "../../types/common"
import {
  CONTENT_PATH,
  allContentFilePaths,
  getToCForMarkdown,
} from "../../utils/mdxUtils"
import { isLessonCompleted } from "../../utils/machineUtils"
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
  apiLink,
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
    videoURL: string
    challenges: MultipleChoiceChallenge[]
  }
  sectionLessons: []
  nextLesson: string
  sectionTitle: string
  lessonPath: string
  learnJson: object
  sections: []
}

export default function LessonPage({
  source,
  toc,
  lessonData,
  sectionLessons,
  nextLesson,
  sectionTitle,
  lessonPath,
  learnJson,
  sections,
}: Props) {
  // TODO: Figure out a better way to do this. It is necessary for the UI to update when state changes.
  const [progressState] = useActor(progressService)

  return (
    <Layout
      content={learnJson}
      sections={sections}
      progressService={progressService}
    >
      <Head>
        <title>{lessonData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {lessonData.videoURL && <LessonHero lessonData={lessonData} />}

      <LessonLayout
        toc={toc}
        source={source}
        components={components}
        sectionLessons={sectionLessons}
        sectionTitle={sectionTitle}
        progressService={progressService}
        lessonPath={lessonPath}
        lessonData={lessonData}
      />

      {(!lessonData.challenges ||
        progressService.state.context.disableChallenges) && (
        <CompleteLessonBtn
          progressService={progressService}
          nextLessonPath={nextLesson}
          lessonPath={lessonPath}
        />
      )}

      {lessonData.challenges &&
        progressService.state.context.disableChallenges == false && (
          <>
            <MCChallenge
              progressService={progressService}
              lessonData={lessonData}
              lessonPath={lessonPath}
            />

            <NextLessonBtn
              path={nextLesson}
              isCompleted={isLessonCompleted(progressService, lessonPath)}
            />
          </>
        )}

      {lessonData.challenges && (
        <SkipChallenge progressService={progressService} />
      )}
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const sections = Object.keys(learnJson)
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
      rehypePlugins: [rehypeSlug, rehypePrism],
    },
    scope: data,
  })
  const lessonData = find(
    { slug: params.slug },
    learnJson[params.section].lessons
  )
  const { title, lessons } = learnJson[params.section]
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
      sectionTitle: title,
      lessonPath: `${params.section}/${params.slug}`,
      learnJson,
      sections,
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
