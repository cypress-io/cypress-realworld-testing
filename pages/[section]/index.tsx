import Head from "next/head"
import Layout from "../../components/Layout"
import SectionHero from "../../components/Section/SectionHero"
import SectionContent from "../../components/Section/SectionContent"
import { isLessonCompleted } from "../../utils/machineUtils"
import { progressService } from "../../machines/progressService"
import learnJson from "../../learn.json"

export default function SectionPage({
  title,
  lessons,
  description,
  lessonPath,
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
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionHero title={title} description={description} />
      <SectionContent
        title={title}
        lessons={lessons}
        progressService={progressService}
        lessonPath={lessonPath}
        section={section}
      />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { title, lessons, description } = learnJson[params.section]
  const sections = Object.keys(learnJson)

  return {
    props: {
      lessons,
      title,
      description,
      lessonPath: `${params.section}/${params.slug}`,
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
