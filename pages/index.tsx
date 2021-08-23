import Head from "next/head"
import dynamic from "next/dynamic"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
const HomeSteps = dynamic(() => import("../components/Home/HomeSteps"), {
  ssr: false,
})
import learnJson from "../learn.json"
import { progressService } from "../machines/progressService"

export default function Home({ content, sections }) {
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

        <main className="flex flex-col w-full flex-1 px-4 lg:px-20">
          <HomeSteps
            sections={sections}
            content={content}
            progressService={progressService}
          />
        </main>
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  console.log(params)
  const sections = Object.keys(learnJson)
  return {
    props: {
      content: learnJson,
      sections,
    },
  }
}
