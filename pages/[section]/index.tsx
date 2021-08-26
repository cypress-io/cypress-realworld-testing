import Head from "next/head"
import dynamic from "next/dynamic"
import Layout from "../../components/Layout"
import SectionHero from "../../components/Section/SectionHero"
import SectionContent from "../../components/Section/SectionContent"
// import SectionFooter from "../../components/Section/SectionFooter"
const SectionSteps = dynamic(
  () => import("../../components/Section/SectionSteps"),
  {
    ssr: false,
  }
)
import { progressService } from "../../machines/progressService"
import learnJson from "../../learn.json"

export default function SectionPage({
  title,
  lessons,
  description,
  nextSection,
  lessonPath,
  content,
  sections,
}) {
  return (
    <Layout content={content} sections={sections}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionHero title={title} description={description} />
      <SectionContent
        lessons={lessons}
        progressService={progressService}
        lessonPath={lessonPath}
      />

      {/* {nextSection && <SectionFooter nextSection={nextSection} />} */}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { title, lessons, description } = learnJson[params.section]
  const sections = Object.keys(learnJson)
  const nextSectionIndex = sections.indexOf(params.section) + 1
  let nextSection

  if (nextSectionIndex < sections.length) {
    nextSection = learnJson[sections[nextSectionIndex]]
  } else {
    nextSection = null
  }

  return {
    props: {
      lessons,
      title,
      description,
      nextSection,
      lessonPath: `${params.section}/${params.slug}`,
      content: learnJson,
      sections,
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
