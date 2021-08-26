import Head from "next/head"
import Layout from "../components/Layout"
import Hero from "../components/Home/Hero"
import Features from "../components/Home/Features"
import Courses from "../components/Home/Courses"
import RealWorldExamples from "../components/Home/RealWorldExamples"
import learnJson from "../learn.json"
import { progressService } from "../machines/progressService"

export default function Home({ content, sections }) {
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
      <RealWorldExamples />
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const sections = Object.keys(learnJson)
  return {
    props: {
      content: learnJson,
      sections,
    },
  }
}
