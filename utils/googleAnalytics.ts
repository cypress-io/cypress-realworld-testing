// https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/

// log the pageview with their URL
export const pageview = (url) => {
  // @ts-ignore
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({ action, params }) => {
  // @ts-ignore
  window.gtag("event", action, params)
}
