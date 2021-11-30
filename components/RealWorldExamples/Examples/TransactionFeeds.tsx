import Image from "next/image"
import Link from "next/link"

export default function ExamplesLayout({ examples }) {
  return (
    <section
      data-test={`real-world-example-transaction-feeds`}
      className="bg-indigo-400"
    >
      <div className={`grid grid-cols-2 gap-8 py-16 h-full max-w-7xl mx-auto`}>
        <div className="w-6/12">
          <h3
            className={`mt-2 text-3xl font-extrabold text-gray-50 tracking-tight sm:text-4xl mb-8`}
            data-test={`transaction-feeds-title`}
          >
            {examples.title}
          </h3>
          <p className={`mt-3 text-base text-indigo-50 w-9/12`}>
            {examples.description}
          </p>
        </div>
        <Image
          src={examples.image}
          alt=""
          width={625}
          height={309}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Examples */}
      <div
        className={`relative pb-20 px-4 sm:px-6 lg:pt-2 lg:pb-28 lg:px-8 bg-indigo-400`}
      >
        <div className="absolute inset-0">
          <div className={`h-1/3 sm:h-2/3 bg-indigo-400`} />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div
            className={`mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-5 lg:max-w-none`}
          >
            {examples.lessons.map((example, indx) => (
              <Link
                href={`/real-world-examples/${example.slug}`}
                key={example.title}
              >
                <a className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className={`p-8 text-center bg-indigo-200`}>
                    <Image
                      className="mx-auto"
                      src={`/images/real-world-examples/${examples.slug}/icons/${example.image}`}
                      alt=""
                      width="200"
                      height="100"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p
                        className={`text-xl font-semibold text-gray-50`}
                        data-test={`transaction-feeds-${indx}-title`}
                      >
                        {example.title}
                      </p>
                      <p
                        className={`mt-3 text-base text-indigo-50`}
                        data-test={`transaction-feeds-${indx}-description`}
                      >
                        {example.description}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
