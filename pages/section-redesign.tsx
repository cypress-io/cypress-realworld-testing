import Head from "next/head"
import Layout from "../components/Redesign/Layout-Redesign"
import SectionHero from "../components/Redesign/Section/SectionHero"
import SectionFooter from "../components/Redesign/Section/SectionFooter"

export default function SectionPage({}) {
  return (
    <Layout>
      <Head>
        <title>Testing Your First Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionHero />

      <main className="mx-auto py-12 px-4 xl:max-w-7xl">Main Content</main>

      <SectionFooter />
    </Layout>
  )
}
