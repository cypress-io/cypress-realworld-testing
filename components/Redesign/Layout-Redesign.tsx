import Header from "./Home/Header"
import Footer from "./Home/Footer"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
