const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          50: "#F3F4FA",
        },
        jade: {
          100: "#C2F1DE",
          200: "#A3E7CB",
          300: "#69D3A7",
        },
        teal: {
          500: "#007780",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss-aspect-ratio
    require("@tailwindcss/aspect-ratio"),
    // https://github.com/tailwindlabs/tailwindcss-forms
    require("@tailwindcss/forms"),
    // https://github.com/tailwindlabs/tailwindcss-typography
    require("@tailwindcss/typography"),
  ],
}
