import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Real World Testing with Cypress"
          />
          <meta
            name="twitter:description"
            content="Real World Testing with Cypress is a four-course curriculum that teaches everything you need to know about testing modern web applications with Cypress"
          />
          <meta
            name="twitter:image"
            content="https://learn.cypress.io/images/social/twitter-card.jpg"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preconnect"
            href="https://8V1MWQUQBN-dsn.algolia.net"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-tomorrow.min.css"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
