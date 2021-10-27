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
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js"
          integrity="sha512-5CYOlHXGh6QpOFA/TeTylKLWfB3ftPsde7AnmhuitiTX4K5SqCLBeKro6sPS8ilsz1Q4NRx3v8Ko2IBiszzdww=="
          crossOrigin="anonymous"
          async
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js"
          integrity="sha512-4xUl/d6D6THrAnXAwGajXkoWaeMNwEKK4iNfq5DotEbLPAfk6FSxSP3ydNxqDgCw1c/0Z1Jg6L8h2j+++9BZmg=="
          crossOrigin="anonymous"
          async
        ></script>
      </Head>

      <main className="py-12 lg:py-20">
        <article className="max-w-6xl mx-auto px-3">
          <header className="mx-auto max-w-xl text-center">
            <h1 className="mb-4">Search</h1>
          </header>
          <SeachInput />
        </article>
      </main>
    </Layout>
  )
}
