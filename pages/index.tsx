// import fs from "fs"
// import matter from "gray-matter"
import React from "react"
import Slider from "react-slick"
import Head from "next/head"
// import Link from "next/link"
// import path from "path"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
import HomeCard from "../components/Home/HomeCard"
// import { allContentFilePaths, CONTENT_PATH } from "../utils/mdxUtils"
import learnJson from "../learn.json"

export default function Home({ content, sections }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <Layout>
      <HomeHero />

      <div className="flex flex-col min-h-screen py-2">
        <Head>
          <title>Real World Testing with Cypress</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            rel="stylesheet"
          />
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
            <div key={content[section].title} className="my-12">
              <div className="section-title flex items-center">
                <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  {content[section].title}
                </h1>
                <span className="ml-8">
                  {content[section].children.length} Lessons
                </span>
              </div>

              <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-12">
                {content[section].description}
              </p>

              <Slider {...settings}>
                {content[section].children.map((lesson) => (
                  <div key={lesson.title}>
                    <HomeCard lesson={lesson} />
                  </div>
                ))}
              </Slider>
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
