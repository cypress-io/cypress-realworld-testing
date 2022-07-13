const withCSS = require("@zeit/next-css")

module.exports = {
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "tailwindui.com",
      "raw.githubusercontent.com",
    ],
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
        source: "testing-your-first-application/how-to-use-cypress-commands",
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
