/* This example requires Tailwind CSS v2.0+ */

export default function RealWorldExamplesHero() {
  return (
    <>
      <hr />
      <div className="relative pt-16 overflow-hidden sm:pt-24 lg:pt-20">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
          <div>
            {/* <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
              Serverless
            </h2> */}
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Real World Examples
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              A payment application to demonstrate real-world usage of Cypress
              testing methods, patterns, and workflows.
            </p>
          </div>
          <div className="mt-12">
            <img
              src="https://raw.githubusercontent.com/cypress-io/cypress-realworld-app/develop/public/img/rwa-readme-screenshot.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}
