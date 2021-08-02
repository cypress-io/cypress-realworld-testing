import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-white">
          <Header />
          {children}
          <Footer />
        </div>
    )
}
