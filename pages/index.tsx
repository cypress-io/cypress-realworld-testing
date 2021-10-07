import Head from "next/head"
import Layout from "../components/Layout"
import Hero from "../components/Home/Hero"
import HomeFeatures from "../components/Home/HomeFeatures"
import HomeCourses from "../components/Home/HomeCourses"
import RealWorldExamples from "../components/Home/RealWorldExamples"
import learnJson from "../learn.json"
import realWorldExamples from "../real-world-examples.json"
import { progressService } from "../machines/progressService"

export default function Home({ content, sections, rWESections }) {
  return (
    <Layout
      content={content}
      sections={sections}
      progressService={progressService}
    >
      <Head>
        <title>Real World Testing with Cypress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <HomeFeatures />
      <HomeCourses
        sections={sections}
        content={content}
        progressService={progressService}
      />
      <RealWorldExamples
        sections={rWESections}
        content={realWorldExamples}
        progressService={progressService}
      />
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const sections = Object.keys(learnJson)
  const rWESections = Object.keys(realWorldExamples)
  return {
    props: {
      content: learnJson,
      sections,
      realWorldExamples,
      rWESections,
    },
  }
}
