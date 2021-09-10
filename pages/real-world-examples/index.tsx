import Head from "next/head"
import Layout from "../../components/Layout"
import Features from "../../components/RealWorldExamples/Features"
import Examples from "../../components/RealWorldExamples/Examples"
import RealWorldExamples from "../../components/RealWorldExamples/RealWorldExamples"
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

      <RealWorldExamples
        sections={rWESections}
        content={realWorldExamples}
        progressService={progressService}
      />

      <Features />

      <Examples
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
