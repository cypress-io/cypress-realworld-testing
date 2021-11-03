import Head from "next/head"
import Layout from "../../components/Layout"
import CourseHero from "../../components/Course/CourseHero"
import CourseContent from "../../components/Course/CourseContent"
import { progressService } from "../../machines/progressService"
import learnJson from "../../data/courses.json"

export default function SectionPage({
  title,
  lessons,
  description,
  learnFeatures,
  content,
  sections,
  section,
}) {
  return (
    <Layout
      content={content}
      sections={sections}
      progressService={progressService}
    >
      <Head>
        <title>{title} | Real World Testing with Cypress</title>
        <meta name="description" content={description} />
      </Head>

      <CourseHero
        title={title}
        description={description}
        image={content[section].image}
      />
      <CourseContent
        title={title}
        lessons={lessons}
        learnFeatures={learnFeatures}
        progressService={progressService}
        section={section}
      />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { title, lessons, description, learnFeatures } =
    learnJson[params.section]
  const sections = Object.keys(learnJson)

  return {
    props: {
      lessons,
      title,
      description,
      learnFeatures,
      content: learnJson,
      sections,
      section: params.section,
    },
  }
}

export async function getStaticPaths() {
  const sections = Object.keys(learnJson)
  const paths = sections.map((section) => {
    const { title, lessons } = learnJson[section]
    return { params: { section, lessons, title } }
  })

  return {
    paths,
    fallback: false,
  }
}
