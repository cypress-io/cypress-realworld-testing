import Link from "next/link"

type Props = {
  showButton?: boolean
}

export default function HomeRealWorldExamples({ showButton }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-8 p-16 bg-indigo-100 h-full">
        <div className="flex flex-col justify-center   w-6/12 mx-auto">
          <h3 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-8">
            Real World Examples
          </h3>
          <p className="mt-3 text-base text-gray-600 w-9/12">
            A payment application to demonstrate real-world usage of Cypress
            testing methods, patterns, and workflows.
          </p>

          {showButton && (
            <Link href="/real-world-examples">
              <a className="inline-block bg-teal-500 rounded-md py-2 px-4 text-base font-medium text-gray-50 text-2xl font-bold mt-20 w-7/12 text-center">
                See Examples
              </a>
            </Link>
          )}
        </div>
        <img src="/images/home/RealWorldApp.png" alt="Real World App" />
      </div>
    </>
  )
}
