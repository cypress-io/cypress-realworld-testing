import Head from "next/head"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
import HomeFeatures from "../components/Home/HomeFeatures"
import HomeCourses from "../components/Home/HomeCourses"
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
        <meta
          name="description"
          content="Learn from top industry experts and level-up your testing knowledge - for free."
        />
      </Head>

      <HomeHero />
      <HomeFeatures />
      <HomeCourses
        sections={sections}
        content={content}
        progressService={progressService}
      />
      <HomeRealWorldExamples />
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
