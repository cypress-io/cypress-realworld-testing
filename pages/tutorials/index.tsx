import Head from "next/head"
import Layout from "@/components/Layout"
import HomeHero from "@/components/Home/HomeHero"
import CourseSelector from "@/components/Tutorials/CourseSelector"
import tutorialsJson from "../../data/tutorials.json"
import { progressService } from "../../machines/progressService"

type Props = {
  content: object
  courses: string[]
}

export default function Home({ content, courses }: Props) {
  return (
    <Layout
      content={content}
      courses={courses}
      progressService={progressService}
    >
      <Head>
        <title>Tutorials | Real World Testing with Cypress</title>
        <meta
          name="description"
          content="Learn from top industry experts and level-up your testing knowledge - for free."
        />
      </Head>

      {/* <HomeHero /> */}
      <CourseSelector
        title="Tutorials"
        courses={courses}
        content={content}
        progressService={progressService}
      />
    </Layout>
  )
}

export const getStaticProps = async ({}) => {
  const courses = Object.keys(tutorialsJson)
  return {
    props: {
      content: tutorialsJson,
      courses,
    },
  }
}
