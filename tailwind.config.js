const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          50: "#F3F4FA",
          400: "#AFB3C7",
          600: "#747994",
        },
        indigo: {
          100: "#DADDFE",
          400: "#6470F3",
        },
        jade: {
          50: "#E4FBF2",
          100: "#C2F1DE",
          200: "#A3E7CB",
          300: "#69D3A7",
        },
        teal: {
          500: "#007780",
          600: "#00595D",
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
