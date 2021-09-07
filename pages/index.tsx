import Head from "next/head"
import Layout from "../components/Layout"
import Hero from "../components/Home/Hero"
import Features from "../components/Home/Features"
import Courses from "../components/Home/Courses"
import RealWorldExamples from "../components/RealWorldExamples/RealWorldExamples"
import learnJson from "../learn.json"
import realWorldExamples from "../real-world-examples.json"
import { progressService } from "../machines/progressService"

export default function Home({ content, sections, rWESections }) {
  return (
    <Layout content={content} sections={sections}>
      <Head>
        <title>Real World Testing with Cypress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Features />
      <Courses
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
