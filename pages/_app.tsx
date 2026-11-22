import "tailwindcss/tailwind.css"
import "../styles/global.css"
import { useEffect } from "react"
import { useRouter } from "next/router"
import * as ga from "../utils/googleAnalytics"
import {
  maskSearchInput,
  sendFullStoryPageProperties,
} from "../utils/fullstory"

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

  // FullStory page properties for the first page, then for each client-side
  // navigation. router.pathname is the route pattern, such as /[course]/[slug].
  useEffect(() => {
    sendFullStoryPageProperties(router.pathname)
  }, [router.pathname, router.asPath])

  useEffect(() => maskSearchInput(), [])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
