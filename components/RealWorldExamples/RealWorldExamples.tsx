import Image from "next/image"

export default function ExamplesLayout({ examples, index }) {
  return (
    <section data-test={`real-world-example-${index}`}>
      <div
        className={`grid grid-cols-2 gap-8 p-16 h-full ${examples.colors.background}`}
      >
        <div className="w-6/12 mx-auto">
          <h3
            className={`mt-2 text-3xl font-extrabold ${examples.colors["text-primary"]} tracking-tight sm:text-4xl mb-8`}
            data-test={`category-${index}-title`}
          >
            {examples.title}
          </h3>
          <p
            className={`mt-3 text-base ${examples.colors["text-secondary"]} w-9/12`}
          >
            {examples.description}
          </p>
        </div>
        <Image src={examples.image} alt="" width={625} height={309} />
      </div>

      {/* Examples */}
      <div
        className={`relative pb-20 px-4 sm:px-6 lg:pt-2 lg:pb-28 lg:px-8 ${examples.colors.background}`}
      >
        <div className="absolute inset-0">
          <div className={`h-1/3 sm:h-2/3 ${examples.colors.background}`} />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div
            className={`mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-${examples.lessons.length} lg:max-w-none`}
          >
            {examples.lessons.map((example, indx) => (
              <div
                key={example.title}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className={`p-8 ${examples.colors.card}`}>
                  <img
                    className="mx-auto"
                    src={`/images/real-world-examples/${examples.slug}/icons/${example.image}`}
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <a
                      href={`/real-world-examples/${example.slug}`}
                      className="block mt-2"
                    >
                      <p
                        className={`text-xl font-semibold ${examples.colors["text-primary"]}`}
                        data-test={`real-world-example-${indx}-title`}
                      >
                        {example.title}
                      </p>
                      <p
                        className={`mt-3 text-base ${examples.colors["text-secondary"]}`}
                        data-test={`real-world-example-${indx}-description`}
                      >
                        {example.description}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
