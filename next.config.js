const withCSS = require("@zeit/next-css")
const withTM = require("next-transpile-modules")([
  "rehype-slug",
  "hast-util-has-property",
  "hast-util-heading-rank",
  "hast-util-to-string",
])

module.exports = withTM({
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com"],
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
})
