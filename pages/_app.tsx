import "tailwindcss/tailwind.css"
import "../styles/global.css"
import Head from "next/head"
import * as FullStory from "@fullstory/browser"

if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  FullStory.init({ orgId: process.env.NEXT_PUBLIC_FULL_STORY_ORG_ID })
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://8V1MWQUQBN-dsn.algolia.net"
          crossOrigin=""
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
