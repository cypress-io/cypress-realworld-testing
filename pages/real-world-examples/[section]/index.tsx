import Head from "next/head"
import dynamic from "next/dynamic"
import Layout from "../../../components/Layout"
import SectionHero from "../../../components/RealWorldExamples/Section/SectionHero"
import SectionContent from "../../../components/RealWorldExamples/Section/SectionContent"
const SectionSteps = dynamic(
  () => import("../../../components/RealWorldExamples/Section/SectionSteps"),
  {
    ssr: false,
  }
)
import { progressService } from "../../../machines/progressService"
import rweJson from "../../../real-world-examples.json"

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
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { title, lessons, description } = rweJson[params.section]
  const sections = Object.keys(rweJson)
  const nextSectionIndex = sections.indexOf(params.section) + 1
  let nextSection

  if (nextSectionIndex < sections.length) {
    nextSection = rweJson[sections[nextSectionIndex]]
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
      content: rweJson,
      sections,
    },
  }
}

export async function getStaticPaths() {
  const sections = Object.keys(rweJson)
  const paths = sections.map((section) => {
    const { title, lessons } = rweJson[section]
    return { params: { section, lessons, title } }
  })

  return {
    paths,
    fallback: false,
  }
}
