import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/Layout"
import SectionHero from "../../components/Section/SectionHero"
import SectionSteps from "../../components/Section/SectionSteps"
import SectionFooter from "../../components/Section/SectionFooter"
import learnJson from "../../learn.json"

export default function SectionPage({
  section,
  title,
  lessons,
  description,
  nextSection,
}) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionHero title={title} description={description} />

      <main className="mx-auto py-12 px-4 max-w-7xl">
        <SectionSteps lessons={lessons} />
      </main>

      {nextSection && <SectionFooter nextSection={nextSection} />}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { title, children, description } = learnJson[params.section]
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
      section: params.section,
      lessons: children,
      title,
      description,
      nextSection,
    },
  }
}

export async function getStaticPaths() {
  const sections = Object.keys(learnJson)
  const paths = sections.map((section) => {
    const { title, children } = learnJson[section]
    return { params: { section: section, lessons: children, title } }
  })

  return {
    paths,
    fallback: true,
  }
}
