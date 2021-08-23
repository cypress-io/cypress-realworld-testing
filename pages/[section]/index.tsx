import Head from "next/head"
import dynamic from "next/dynamic"
import Layout from "../../components/Layout"
import SectionHero from "../../components/Section/SectionHero"
import SectionFooter from "../../components/Section/SectionFooter"
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
}) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionHero title={title} description={description} />

      <main className="mx-auto py-12 px-4 xl:max-w-7xl">
        <SectionSteps
          lessons={lessons}
          progressService={progressService}
          lessonPath={lessonPath}
        />
      </main>

      {nextSection && <SectionFooter nextSection={nextSection} />}
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
