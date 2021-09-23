import { CheckIcon } from "@heroicons/react/outline"

const features = [
  {
    name: "4 Courses",
    description: "",
  },
  {
    name: "25+ Lessons",
    description: "",
  },
  {
    name: "30+ Real World Examples",
    description: "",
  },
]

export default function Hero() {
  return (
    <div className="">
      <div className="relative overflow-hidden">
        <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1
                      data-test="hero-heading"
                      className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
                    >
                      <span className="block">Real World Testing</span>
                      <span className="block text-indigo-400">
                        with Cypress
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Learn from top industry experts and level-up your testing
                      knowledge - for free.
                    </p>

                    {/* Features */}
                    <div className="mt-12">
                      <dl className="">
                        {features.map((feature) => (
                          <div key={feature.name} className="relative mb-6">
                            <dt>
                              <CheckIcon
                                className="absolute h-6 w-6 text-green-500"
                                aria-hidden="true"
                              />
                              <p className="ml-9 text-lg leading-6 font-medium text-indigo-400">
                                {feature.name}
                              </p>
                            </dt>
                            <dd className="mt-2 ml-9 text-base text-gray-500">
                              {feature.description}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="mt-10 sm:mt-12">
                      <form
                        action="#"
                        className="sm:max-w-xl sm:mx-auto lg:mx-0"
                      >
                        <div className="sm:flex">
                          <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Subscribe for Updates
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Subscribe for Updates"
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                        {/* <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                          Start your free 14-day trial, no credit card
                          necessary. By providing your email, you agree to our{" "}
                          <a href="#" className="font-medium text-white">
                            terms or service
                          </a>
                          .
                        </p> */}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More main page content here... */}
        </main>
      </div>
    </div>
  )
}
