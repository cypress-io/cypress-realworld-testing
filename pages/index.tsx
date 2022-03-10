import Head from "next/head"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
import HomeFeatures from "../components/Home/HomeFeatures"
import HomeCoursesLayout from "../components/Home/HomeCoursesLayout"
import HomeCoursesLayoutMobile from "../components/Home/HomeCoursesLayoutMobile"
import HomeRealWorldExamples from "../components/Home/HomeRealWorldExamples"
import coursesJson from "../data/courses.json"
import realWorldExamples from "../data/real-world-examples.json"
import { progressService } from "../machines/progressService"

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
        <title>Real World Testing with Cypress</title>
        <meta
          name="description"
          content="Real World Testing with Cypress is a four-course curriculum that teaches everything you need to know about testing modern web applications with Cypress"
        />
      </Head>

      <HomeHero />

      <HomeCoursesLayout
        courses={courses}
        content={content}
        progressService={progressService}
      />

      <HomeCoursesLayoutMobile
        courses={courses}
        content={content}
        progressService={progressService}
      />
      <HomeFeatures />
      <HomeRealWorldExamples />
    </Layout>
  )
}

export const getStaticProps = async ({}) => {
  const courses = Object.keys(coursesJson)
  return {
    props: {
      content: coursesJson,
      courses,
      realWorldExamples,
    },
  }
}
