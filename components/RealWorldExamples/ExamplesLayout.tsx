import Image from "next/image"

export default function ExamplesLayout({ examples }) {
  console.log(examples)
  return (
    <>
      <div className="grid grid-cols-2 gap-8 p-16 bg-indigo-100 h-full">
        <div className="w-6/12 mx-auto">
          <h3 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-8">
            {examples.title}
          </h3>
          <p className="mt-3 text-base text-gray-600 w-9/12">
            {examples.description}
          </p>
        </div>
        <img src={examples.image} alt="" />
      </div>

      {/* Examples */}
      <div className="relative bg-indigo-100 pb-20 px-4 sm:px-6 lg:pt-2 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-indigo-100 h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {examples.lessons.map((example) => (
              <div
                key={example.title}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-indigo-400 p-8">
                  <img
                    className="mx-auto"
                    src={`/images/real-world-examples/${examples.slug}/icons/${example.image}`}
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <a href={`#`} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {example.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
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
    </>
  )
}
