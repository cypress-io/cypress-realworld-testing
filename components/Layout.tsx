import dynamic from "next/dynamic"
import Head from "next/head"
import Header from "./Header"
import { useEffect } from "react"
import * as FullStory from "@fullstory/browser"

const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
})

export default function Layout({
  children,
  content,
  sections,
  progressService,
}) {
  useEffect(() => {
    FullStory.init({ orgId: process.env.NEXT_PUBLIC_FULL_STORY_ORG_ID })
  }, [])
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        content={content}
        sections={sections}
        progressService={progressService}
      />
      {children}
      <Footer />
    </>
  )
}
