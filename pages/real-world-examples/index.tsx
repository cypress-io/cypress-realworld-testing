import Head from "next/head"
import dynamic from "next/dynamic"
import Layout from "@/components/Layout"
import RWEFeatures from "@/components/RealWorldExamples/RWEFeatures"
import RWEHero from "@/components/RealWorldExamples/RWEHero"
import { progressService } from "../../machines/progressService"
import coursesJson from "../../data/courses.json"
import realWorldExamples from "../../data/real-world-examples.json"

const RealWorldExamples = dynamic(
  () => import("@/components/RealWorldExamples/RealWorldExamples"),
  { ssr: false }
)

export default function Home({ content, sections, rWESections }) {
  return (
    <Layout
      content={content}
      courses={sections}
      progressService={progressService}
    >
      <Head>
        <title>Real World Examples | Real World Testing with Cypress</title>
        <meta
          name="description"
          content="Test examples from a payment application that demonstrate real-world usage of Cypress testing methods, patterns, and workflows."
        />
      </Head>

      <RWEHero />

      <RWEFeatures />

      {rWESections.map((section, index) => (
        <RealWorldExamples
          key={index}
          examples={realWorldExamples[section]}
          index={index}
        />
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const sections = Object.keys(coursesJson)
  const rWESections = Object.keys(realWorldExamples)
  return {
    props: {
      content: coursesJson,
      sections,
      realWorldExamples,
      rWESections,
    },
  }
}
