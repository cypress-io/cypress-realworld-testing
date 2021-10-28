import Head from "next/head"
import Layout from "../../components/Layout"
import RWEFeatures from "../../components/RealWorldExamples/RWEFeatures"
import RWETests from "../../components/RealWorldExamples/RWETests"
import RWEHero from "../../components/RealWorldExamples/RWEHero"
import { progressService } from "../../machines/progressService"
import learnJson from "../../learn.json"
import realWorldExamples from "../../real-world-examples.json"

export default function Home({ content, sections, rWESections }) {
  return (
    <Layout
      content={content}
      sections={sections}
      progressService={progressService}
    >
      <Head>
        <title>Real World Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RWEHero />

      <RWEFeatures />

      <RWETests
        sections={rWESections}
        content={realWorldExamples}
        progressService={progressService}
      />
    </Layout>
  )
}

export const getStaticProps = async () => {
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
