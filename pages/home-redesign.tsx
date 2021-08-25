import Head from "next/head"
import dynamic from "next/dynamic"
import Layout from "../components/Redesign/Layout-Redesign"
import Hero from "../components/Redesign/Home/Hero"
import Features from "../components/Redesign/Home/Features"
import Courses from "../components/Redesign/Home/Courses"
import RealWorldExamples from "../components/Redesign/Home/RealWorldExamples"
const HomeSteps = dynamic(() => import("../components/Home/HomeSteps"), {
  ssr: false,
})
import learnJson from "../learn.json"
import { progressService } from "../machines/progressService"

export default function Home({ content, sections }) {
  return (
    <Layout>
      <Head>
        <title>Real World Testing with Cypress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Features />
      <Courses />
      <RealWorldExamples />

      {/* <div className="flex flex-col min-h-screen py-2"> */}
      {/* <main className="flex flex-col w-full flex-1 px-4 lg:px-20">
          <HomeSteps
            sections={sections}
            content={content}
            progressService={progressService}
          />
        </main> */}
      {/* </div> */}
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
