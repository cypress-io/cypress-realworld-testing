import Head from "next/head"
import Layout from "../components/Redesign/Layout-Redesign"
import SectionHero from "../components/Redesign/Section/SectionHero"
import SectionFooter from "../components/Redesign/Section/SectionFooter"
import SectionContent from "../components/Redesign/Section/SectionContent"

export default function SectionPage({}) {
  return (
    <Layout>
      <Head>
        <title>Testing Your First Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionHero />
      <SectionContent />
      <SectionFooter />
    </Layout>
  )
}
