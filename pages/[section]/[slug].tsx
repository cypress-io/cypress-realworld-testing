import fs from "fs"
import matter from "gray-matter"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
//import dynamic from 'next/dynamic'
import Head from "next/head"
import Link from "next/link"
import path from "path"
import Layout from "../../components/Layout"
import LessonSideNav from "../../components/LessonSidenav"
import LessonHero from "../../components/Lesson/LessonHero"
import { LessonTableOfContents } from "../../types/common"
import {
  CONTENT_PATH,
  allContentFilePaths,
  getToCForMarkdown,
} from "../../utils/mdxUtils"
import { find } from "lodash/fp"
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
  lessonData: {}
}

export default function ContentPage({
  source,
  frontMatter,
  toc,
  lessonData,
}: Props) {
  return (
    <Layout>
      <Head>
        <title>{frontMatter.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LessonHero lessonData={lessonData} />

      <div className="content-title">
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className="description">{frontMatter.description}</p>
        )}
      </div>

      <main className="w-full max-w-7xl mx-auto">
        <div className="lg:flex">
          <div className="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden">
            <LessonSideNav navigation={toc} />
          </div>

          <div
            id="content-wrapper"
            className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible"
          >
            <MDXRemote {...source} components={components} />
          </div>
        </div>
      </main>
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
      rehypePlugins: [],
    },
    scope: data,
  })

  const lessonData = find(
    { slug: params.slug },
    learnJson[params.section].children
  )

  console.log(lessonData)

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      toc,
      lessonData,
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
