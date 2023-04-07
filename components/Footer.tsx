const navigation = {
  main: [
    { name: "Docs", href: "https://docs.cypress.io/" },
    {
      name: "Real World App",
      href: "https://github.com/cypress-io/cypress-realworld-app",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UC-EOsTo2l2x39e4JmSaWNRQ",
    },
    {
      name: "Discord",
      href: "https://discord.gg/cMjUZg7",
    },
    {
      name: "GitHub",
      href: "https://github.com/cypress-io/cypress-realworld-testing",
    },
  ],
}

export default function Footer() {
  return (
    <>
      <hr />
      <footer className="bg-indigo-500 p-4 md:p-0">
        {/* Email Subscription */}
        {/* <div className="py-8 lg:mx-auto lg:flex lg:max-w-7xl lg:items-center lg:justify-center xl:mt-0">
          <div>
            <h3 className="mr-10 text-center text-xl tracking-wider text-gray-50 lg:text-left">
              Get course updates to your inbox
            </h3>
          </div>
          <form className="mt-4 w-full sm:flex sm:justify-center lg:mt-0 lg:max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:placeholder-gray-400 focus:outline-none sm:max-w-xs md:rounded-none md:rounded-tl-md md:rounded-bl-md"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded border border-transparent bg-indigo-100 py-2 px-4 text-indigo-900 md:rounded-none md:rounded-tr-md md:rounded-br-md"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div> */}

        <hr />

        <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a
                  href={item.href}
                  className="text-base text-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </div>
            ))}
            <div className="px-5 py-2">
              <a
                className="text-base text-gray-50 hover:text-gray-900 cursor-pointer"
                onClick={() =>
                  (window as any).Osano.cm.showDrawer(
                    "osano-cm-dom-info-dialog-open"
                  )
                }
              >
                Cookie Preferences
              </a>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-50">
            &copy; {`${new Date().getFullYear()}`} Cypress. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
