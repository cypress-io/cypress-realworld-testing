import 'tailwindcss/tailwind.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link
        href="https://rsms.me/inter/inter.css"
        rel="stylesheet"
      />
    </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
