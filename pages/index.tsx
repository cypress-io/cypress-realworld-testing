import Head from "next/head"
import { useActor } from "@xstate/react"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
import HomeSteps from "../components/Home/HomeSteps"
import { progressService } from "../machines/progressService"

export default function Home({ progressState }) {
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
          <HomeSteps progressState={progressState} />
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      progressState: progressService.state.context.learnData,
    },
  }
}
