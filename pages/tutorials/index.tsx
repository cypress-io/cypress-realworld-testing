import Head from "next/head"
import Layout from "@/components/Layout"
import TutorialsHero from "@/components/Tutorials/TutorialsHero"
import Tutorials from "@/components/Tutorials/Tutorials"
import coursesJson from "../../data/courses.json"
import tutorialsJson from "../../data/tutorials.json"
import { progressService } from "../../machines/progressService"

type Props = {
  content: object
  sections: string[]
  tutorials: string[]
}

export default function Home({ content, sections, tutorials }: Props) {
  return (
    <Layout
      content={content}
      courses={sections}
      progressService={progressService}
    >
      <Head>
        <title>Tutorials | Real World Testing with Cypress</title>
        <meta
          name="description"
          content="Learn from top industry experts and level-up your testing knowledge - for free."
        />
      </Head>

      <TutorialsHero />

      <Tutorials
        sections={tutorials}
        content={tutorialsJson}
        progressService={progressService}
      />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const sections = Object.keys(coursesJson)
  const tutorials = Object.keys(tutorialsJson)
  return {
    props: {
      content: coursesJson,
      sections,
      tutorialsJson,
      tutorials,
    },
  }
}
