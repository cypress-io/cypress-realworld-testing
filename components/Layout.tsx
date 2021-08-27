import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children, content, sections }) {
  return (
    <>
      <Header content={content} sections={sections} />
      {children}
      <Footer />
    </>
  )
}
