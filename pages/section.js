import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import Layout from '../components/Layout'
import { allContentFilePaths, CONTENT_PATH } from '../utils/mdxUtils'
import SectionHero from "../components/SectionHero"
import SectionCard from "../components/SectionCard"

export default function Home({ content }) {
  return (
    <Layout>
      <Head>
        <title>Testing Your First Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <SectionHero />
      
      <main className="">
        {content.map((lesson) => (
          
          <section key={lesson.filePath}>
            {/* <Link
              as={`/${lesson.filePath.replace(/\.mdx?$/, '')}`}
              href={`/[section]/[slug]`}
            >
              <a>{lesson.data.title}</a>
            </Link> */}
            <SectionCard title={lesson.data.title }/>
          </section>
        ))}
      </main>
    </Layout>
  )
}

export function getStaticProps() {
  const content = allContentFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { content } }
}