import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import SectionHero from "../../components/SectionHero"
import SectionCard from "../../components/SectionCard"
import SectionSteps from "../../components/SectionSteps"
import learnJson from "../../learn.json"

export default function SectionPage({ section, title, lessons, description }) {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>Testing Your First Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionHero title={title} description={description} />

      <main className="mx-auto py-12 px-4 max-w-7xl">
        <SectionSteps lessons={lessons} />
      </main>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { title, children, description } = learnJson[params.section]
  return {
    props: { section: params.section, lessons: children, title, description },
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
