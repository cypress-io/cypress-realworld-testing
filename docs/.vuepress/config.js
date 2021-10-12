module.exports = {
  title: "Real World Testing with Cypress Docs",
  description:
    "Documentation for the Real World Testing with Cypress Next.js app",
  themeConfig: {
    sidebar: [
      {
        title: "Directory Structure",
        path: "/directory-structure/",
      },
      {
        title: "Pages",
        path: "/pages/",
        children: ["#"],
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
}
