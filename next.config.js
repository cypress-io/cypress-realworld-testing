const withCSS = require("@zeit/next-css")

module.exports = {
  swcMinify: true,
  images: {
    // `next export` (Cloudflare Pages) can't use the default optimizing
    // loader. The akamai loader with a "/" path serves the original file from
    // /public, adding an `?imwidth=` query the static host ignores. Only local
    // `/images/...` sources work; remote URLs would come out as "/https://...".
    loader: "akamai",
    path: "/",
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    })
    return config
  },
  async redirects() {
    return [
      {
        source:
          "/testing-your-first-application/todomvc-app-install-and-overview",
        destination: "/testing-your-first-application/app-install-and-overview",
        permanent: true,
      },
      {
        source:
          "/testing-your-first-application/installing-cypress-and-writing-our-first-test",
        destination:
          "/testing-your-first-application/installing-cypress-and-writing-your-first-test",
        permanent: true,
      },
      {
        source:
          "/testing-your-first-application/setting-up-data-before-each-test",
        destination: "/testing-your-first-application",
        permanent: true,
      },
      {
        source: "/testing-your-first-application/how-to-use-cypress-commands",
        destination:
          "/testing-your-first-application/how-to-test-forms-and-custom-cypress-commands",
        permanent: true,
      },
      {
        source:
          "/testing-your-first-application/cypress-command-logs-snapshots-and-aliases",
        destination: "/testing-your-first-application",
        permanent: true,
      },
      {
        source: "/testing-your-first-application/testing-what-isnt-there",
        destination: "/testing-your-first-application",
        permanent: true,
      },
    ]
  },
}
