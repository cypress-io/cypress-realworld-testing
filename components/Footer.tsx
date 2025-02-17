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
      href: "https://discord.com/invite/cypress",
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
      <footer className="p-4 bg-indigo-500 md:p-0">
        {/* Email Subscription */}
        {/* <div className="py-8 lg:mx-auto lg:flex lg:max-w-7xl lg:items-center lg:justify-center xl:mt-0">
          <div>
            <h3 className="mr-10 text-xl tracking-wider text-center text-gray-50 lg:text-left">
              Get course updates to your inbox
            </h3>
          </div>
          <form className="w-full mt-4 sm:flex sm:justify-center lg:mt-0 lg:max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded appearance-none focus:placeholder-gray-400 focus:outline-none sm:max-w-xs md:rounded-none md:rounded-tl-md md:rounded-bl-md"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 text-indigo-900 bg-indigo-100 border border-transparent rounded md:rounded-none md:rounded-tr-md md:rounded-br-md"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div> */}

        <hr />

        <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
          <nav
            role="navigation"
            className="flex flex-wrap justify-center -mx-5 -my-2"
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
                className="text-base cursor-pointer text-gray-50 hover:text-gray-900"
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
          <p className="mt-8 text-base text-center text-gray-50">
            &copy; {`${new Date().getFullYear()}`} Cypress. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
