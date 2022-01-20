import Image from "next/image"

export default function HomeHero() {
  return (
    <>
      <div className="relative overflow-hidden">
        <main>
          <div className="pt-10 bg-jade-300 sm:pt-16 lg:pt-8 lg:overflow-hidden">
            <div className="mx-auto w-full lg:pl-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                  <div className="lg:py-24">
                    <h1
                      data-test="hero-heading"
                      className="mt-4 font-bold text-5xl text-gray-1000 leading-tight"
                    >
                      Learn how to use the most powerful testing suite—for free
                    </h1>
                    <p className="mt-3 text-base text-jade-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
                      Learn from top industry experts and level-up your testing
                      knowledge &mdash; for free!
                    </p>

                    {/* Features */}
                    <div className="mt-8 overflow-hidden">
                      <dl className="-mx-8 -mt-8 flex flex-wrap">
                        <div className="flex flex-col px-8 pt-8">
                          <dt className="order-2 text-base font-medium text-gray-600">
                            Courses
                          </dt>
                          <dd className="order-1 text-3xl text-gray-600 sm:text-3xl">
                            4
                          </dd>
                        </div>
                        <div className="flex flex-col px-8 pt-8">
                          <dt className="order-2 text-base font-medium text-gray-600">
                            Lessons
                          </dt>
                          <dd className="order-1 text-3xl text-gray-600 sm:text-3xl">
                            25+
                          </dd>
                        </div>
                        <div className="flex flex-col px-8 pt-8">
                          <dt className="order-2 text-base font-medium text-gray-600">
                            Real World Examples
                          </dt>
                          <dd className="order-1 text-3xl text-gray-600 sm:text-3xl">
                            30+
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Email Subscribe */}
                    <div className="mt-10 sm:mt-12">
                      <form
                        action="#"
                        className="sm:mx-auto sm:max-w-xl lg:mx-0"
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
                              className="border-2text-base block w-full rounded-md px-4 py-3 text-gray-900 placeholder-gray-500"
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              type="submit"
                              className="block w-full rounded-md bg-teal-500 py-3 px-4 font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <Image
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="/images/home/home-rwa-hero.svg"
                      alt="Home Page Hero Image"
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
