import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import SectionHero from "../../components/SectionHero"
import SectionSteps from "../../components/SectionSteps"
import SectionFooter from "../../components/SectionFooter"
import learnJson from "../../learn.json"

export default function SectionPage({
  section,
  title,
  lessons,
  description,
  nextSection,
}) {
  const router = useRouter()
  console.log(nextSection)

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

      <SectionFooter nextSection={nextSection} />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { title, children, description } = learnJson[params.section]
  // TODO: Clean this up
  const sections = Object.keys(learnJson)
  const nextSectionIndex = sections.indexOf(params.section) + 1
  const nextSection = learnJson[sections[nextSectionIndex]]
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
