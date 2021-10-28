import Head from "next/head"
import Layout from "../components/Layout"
import { progressService } from "../machines/progressService"
import SeachInput from "../components/Search/SearchInput"

export default function Home({ content, sections, rWESections }) {
  return (
    <Layout
      content={content}
      sections={sections}
      progressService={progressService}
    >
      <Head>
        <title>Real World Testing with Cypress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-12 lg:py-20">
        <article className="max-w-6xl mx-auto px-3 py-32">
          <header className="mx-auto max-w-xl text-center">
            <h1 className="mb-4">Search</h1>
          </header>
          <SeachInput />
        </article>
      </main>
    </Layout>
  )
}
