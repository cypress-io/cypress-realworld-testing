const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <hr />
      {/* Email Subscription */}
      <div className="py-8 lg:flex lg:items-center lg:justify-between lg:max-w-7xl lg:mx-auto xl:mt-0">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Subscribe for updates
          </h3>
          <p className="mt-2 text-base text-gray-500">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
        </div>
        <form className="mt-4 sm:flex sm:max-w-md lg:mt-0">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email-address"
            id="email-address"
            autoComplete="email"
            required
            className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400 sm:max-w-xs"
            placeholder="Enter your email"
          />
          <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        {/* <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div> */}
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2021 Cypress. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
