import { CheckIcon } from "@heroicons/react/outline"

export default function RWEAbout() {
  return (
    <div className="relative p-8 bg-gray-50 md:p-16">
      <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 ">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-700">
          About these examples
        </h2>
        <p className="max-w-5xl mb-12 text-gray-700">
          The Real World App is a payment application that demonstrates
          real-world usage of Cypress testing methods, patterns, and workflows.
          Each example breaks down, line by line, a single test within the Real
          World App.
        </p>

        <div className="relative z-10">
          <div className="flex mx-auto text-base max-w-prose lg:max-w-none">
            <div className="">
              <h3 className="text-xl font-bold tracking-tight text-gray-700">
                What You Will Learn
              </h3>

              {/* Features */}
              <div className="mt-12">
                <dl className="">
                  <div className="relative mb-6">
                    <dt>
                      <CheckIcon
                        className="absolute w-6 h-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="text-lg font-medium leading-6 text-gray-700 ml-9">
                        How to Test Authentication
                      </p>
                    </dt>
                  </div>

                  <div className="relative mb-6">
                    <dt>
                      <CheckIcon
                        className="absolute w-6 h-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="text-lg font-medium leading-6 text-gray-700 ml-9">
                        How to Test GraphQL
                      </p>
                    </dt>
                  </div>

                  <div className="relative mb-6">
                    <dt>
                      <CheckIcon
                        className="absolute w-6 h-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="text-lg font-medium leading-6 text-gray-700 ml-9">
                        How to Create Dynamic Tests
                      </p>
                    </dt>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
