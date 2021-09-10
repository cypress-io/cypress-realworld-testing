import Header from "./Header"
import Footer from "./Footer"

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
