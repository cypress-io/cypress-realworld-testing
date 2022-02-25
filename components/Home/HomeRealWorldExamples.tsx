import Link from "next/link"
import Image from "next/image"

export default function HomeRealWorldExamples() {
  return (
    <>
      <div className="grid h-full gap-8 bg-indigo-50 p-8 pt-12 lg:grid-cols-2 lg:p-16">
        {/* Column 1 */}
        <div className="mx-auto flex flex-col justify-center lg:w-6/12">
          <h3 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Real World Examples
          </h3>
          <p className="mt-3 text-base text-gray-600 lg:w-9/12">
            A payment application to demonstrate real-world usage of Cypress
            testing methods, patterns, and workflows.
          </p>

          <Link href="/real-world-examples">
            <a className="mt-12 inline-block rounded-md bg-indigo-500 py-2 px-4 text-center text-base text-gray-50 lg:w-6/12">
              See Examples
            </a>
          </Link>
        </div>

        {/* Column 2 */}
        <div className="flex w-full flex-col justify-center">
          <Image
            src="/images/home/real-world-app.svg"
            alt="Real World App"
            width={873}
            height={621}
          />
        </div>
      </div>
    </>
  )
}
