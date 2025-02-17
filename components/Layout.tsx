import Head from "next/head"
import dynamic from "next/dynamic"
import { useActor } from "@xstate/react"
import Header from "./Header"
import { bannerService } from "../machines/bannerService"

const Banner = dynamic(() => import("./Banner"), {
  ssr: false,
})

const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
})

type Props = {
  children: object
  content: object
  courses: string[]
  progressService: object
}

export default function Layout({
  children,
  content,
  courses,
  progressService,
}: Props) {
  useActor(bannerService)

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* {bannerService.state.context.displayBanner && (
        <Banner bannerService={bannerService} />
      )} */}
      <Header
        content={content}
        courses={courses}
        progressService={progressService}
      />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
