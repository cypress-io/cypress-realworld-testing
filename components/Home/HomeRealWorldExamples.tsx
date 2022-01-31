import Link from "next/link"
import Image from "next/image"

export default function HomeRealWorldExamples() {
  return (
    <>
      <div className="grid h-full grid-cols-2 gap-8 bg-indigo-100 p-16">
        <div className="mx-auto flex w-6/12   flex-col justify-center">
          <h3 className="mt-2 mb-8 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Real World Examples
          </h3>
          <p className="mt-3 w-9/12 text-base text-gray-600">
            A payment application to demonstrate real-world usage of Cypress
            testing methods, patterns, and workflows.
          </p>

          <Link href="/real-world-examples">
            <a className="mt-20 inline-block w-7/12 rounded-md bg-teal-500 py-2 px-4 text-center text-base text-2xl font-medium font-bold text-gray-50">
              See Examples
            </a>
          </Link>
        </div>
        <Image
          src="/images/home/RealWorldApp.png"
          alt="Real World App"
          width={873}
          height={621}
        />
      </div>
    </>
  )
}
