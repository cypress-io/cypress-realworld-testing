const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "course-hero": "url('/images/course-page/course-hero.svg')",
        "home-hero": "url('/images/home/hero/hero-bg.png')",
        "home-features": "url('/images/home/features-bg.png')",
      },

      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },

      colors: {
        gray: {
          50: "#F3F4FA",
          400: "#AFB3C7",
          600: "#747994",
          800: "#434861",
          900: "#2E3247",
          1000: "#1B1E2E",
        },
        indigo: {
          50: "#F0F1FF",
          100: "#DADDFE",
          500: "#4956E3",
          900: "#1C236D",
        },
        jade: {
          50: "#E4FBF2",
          100: "#C2F1DE",
          200: "#A3E7CB",
          300: "#69D3A7",
          700: "#00442A",
          800: "#003220",
        },
        teal: {
          500: "#007780",
          600: "#00595D",
        },
      },
    },
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
