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
          50: "#F0F1FF",
          100: "#DADDFE",
          200: "#C5C9FD",
          300: "#9AA2FC",
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
        white: {
          100: "#F8F9FF",
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
