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
      href: "https://github.com/cypress-io/cypress",
    },
  ],
}

export default function Footer() {
  return (
    <>
      <hr />
      <footer className="bg-indigo-500 p-4 md:p-0">
        {/* Email Subscription */}
        <div className="py-8 lg:flex lg:items-center lg:justify-center lg:max-w-7xl lg:mx-auto xl:mt-0">
          <div>
            <h3 className="text-gray-50 text-xl tracking-wider mr-10">
              Get course updates to your inbox
            </h3>
          </div>
          <form className="mt-4 sm:flex sm:max-w-md lg:mt-0 w-full">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded md:rounded-none md:rounded-tl-md md:rounded-bl-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:max-w-xs"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full bg-indigo-100 border border-transparent rounded md:rounded-none md:rounded-tr-md md:rounded-br-md py-2 px-4 flex items-center justify-center text-indigo-900"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <hr />

        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
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
          </nav>
          <p className="mt-8 text-center text-base text-gray-50">
            &copy; {`${new Date().getFullYear()}`} Cypress. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
