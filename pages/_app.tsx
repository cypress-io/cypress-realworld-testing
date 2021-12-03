import "tailwindcss/tailwind.css"
import "../styles/global.css"
import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"
import * as FullStory from "@fullstory/browser"
import * as ga from "../utils/googleAnalytics"

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on("routeChangeComplete", handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  // @ts-ignore
  if (typeof window !== "undefined" && !window.Cypress) {
    // eslint-disable-next-line
    useEffect(() => {
      FullStory.init({ orgId: process.env.NEXT_PUBLIC_FULL_STORY_ORG_ID })
    }, [])
  }

  return (
    <>
      <Head>
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
