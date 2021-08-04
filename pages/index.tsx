// import fs from "fs"
// import matter from "gray-matter"
import Head from "next/head"
// import Link from "next/link"
// import path from "path"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
// import { allContentFilePaths, CONTENT_PATH } from "../utils/mdxUtils"
import learnJson from "../learn.json"

export default function Home({ content, sections }) {
  return (
    <Layout>
      <HomeHero />

      <div className="flex flex-col min-h-screen py-2">
        <Head>
          <title>Real World Testing with Cypress</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col w-full flex-1 px-20">
          {/* <ul>
            {content.map((lesson) => (
              <li key={lesson.filePath}>
                <Link
                  as={`/${lesson.filePath.replace(/\.mdx?$/, "")}`}
                  href={`/[section]/[slug]`}
                >
                  <a>{lesson.data.title}</a>
                </Link>
              </li>
            ))}
          </ul> */}

          {sections.map((section) => (
            <div key={content[section].title}>
              <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                {content[section].title}
              </h1>

              <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {content[section].description}
              </p>

              {content[section].children.map((lesson) => (
                <div key={lesson.title}>{lesson.title}</div>
              ))}
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

// export function getStaticProps() {
//   const content = allContentFilePaths.map((filePath) => {
//     const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
//     const { content, data } = matter(source)

//     return {
//       content,
//       data,
//       filePath,
//     }
//   })

//   return { props: { content } }
// }

export async function getStaticProps() {
  const sections = Object.keys(learnJson)
  return {
    props: {
      content: learnJson,
      sections,
    },
  }
}
