import Link from "next/link"
import Image from "next/image"

export default function HomeRealWorldExamples() {
  return (
    <>
      <div className="grid grid-cols-2 gap-8 p-16 bg-indigo-50 h-full">
        <div className="flex flex-col justify-center   w-6/12 mx-auto">
          <h3 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl mb-8">
            Real World Examples
          </h3>
          <p className="mt-3 w-9/12 text-base text-gray-600">
            A payment application to demonstrate real-world usage of Cypress
            testing methods, patterns, and workflows.
          </p>

          <Link href="/real-world-examples">
            <a className="inline-block bg-indigo-500 rounded-md py-2 px-4 text-base text-gray-50 text-lg mt-20 w-7/12 text-center">
              See Examples
            </a>
          </Link>
        </div>
        <Image
          src="/images/home/real-world-app.svg"
          alt="Real World App"
          width={873}
          height={621}
        />
      </div>
    </>
  )
}
