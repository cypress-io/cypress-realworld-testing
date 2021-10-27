import Head from "next/head"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
import HomeFeatures from "../components/Home/HomeFeatures"
import CourseFirstApp from "../components/Home/CourseFirstApp"
import HomeRealWorldExamples from "../components/Home/HomeRealWorldExamples"
import learnJson from "../learn.json"
import realWorldExamples from "../real-world-examples.json"
import { progressService } from "../machines/progressService"

export default function Home({ content, sections }) {
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

      {/* <HomeHero /> */}
      {/* <HomeFeatures /> */}
      <CourseFirstApp
        content={content}
        completedLessons={progressService.state.context.lessons}
      />
      {/* <HomeRealWorldExamples /> */}
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const sections = Object.keys(learnJson)
  return {
    props: {
      content: learnJson,
      sections,
      realWorldExamples,
    },
  }
}
