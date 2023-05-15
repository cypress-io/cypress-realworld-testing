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
        <script src="https://cmp.osano.com/AzqisZTSBrMdc3qLt/bb12d637-24a5-47ce-8788-92e13ca795cf/osano.js"></script>
        <title>
          Learn E2E Testing from the Experts | Cypress Testing Tools
        </title>
        <meta
          name="description"
          content="Real World Testing with Cypress is a four-course curriculum that teaches everything you need to know about testing modern web applications and E2E testing with Cypress"
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
