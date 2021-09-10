import Header from "./Header"
import Footer from "./Footer"
import MobileProgressMenu from "./Mobile/ProgressMenu"

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
      <MobileProgressMenu
        content={content}
        sections={sections}
        progressService={progressService}
      />
      {children}
      <Footer />
    </>
  )
}
