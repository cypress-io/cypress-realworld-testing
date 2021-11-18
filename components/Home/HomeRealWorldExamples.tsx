import Link from "next/link"

export default function HomeRealWorldExamples({}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-8 p-16 bg-indigo-100">
        <div>
          <h3 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-8">
            Real World Examples
          </h3>
          <p className="mt-3 text-base text-gray-600">
            A payment application to demonstrate real-world usage of Cypress
            testing methods, patterns, and workflows.
          </p>

          <Link href="/real-world-examples">
            <a className="bg-teal-500  rounded-md py-2 px-4 text-base font-medium text-gray-50 text-2xl font-bold">
              See Examples
            </a>
          </Link>
        </div>
        <div>
          <img
            src="https://raw.githubusercontent.com/cypress-io/cypress-realworld-app/develop/public/img/rwa-readme-screenshot.png"
            alt=""
          />
        </div>
      </div>
    </>
  )
}
