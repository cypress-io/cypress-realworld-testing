import Header from "./Header"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
})

export default function Layout({
  children,
  content,
  sections,
  progressService,
}) {
  return (
    <>
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
