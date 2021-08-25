import Image from "next/image"

export default function SectionHero(props) {
  return (
    <div className="relative bg-gray-50">
      <main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">
                Testing Your First Application
              </span>{" "}
              {/* <span className="block text-indigo-600 xl:inline">online business</span> */}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              accusamus, quae quaerat deleniti repudiandae dicta nesciunt eos
              facilis maxime cumque commodi magnam debitis eum. Debitis maxime
              aperiam dolorem iusto expedita?
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <Image
            className="absolute inset-0 w-full h-full object-center"
            src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
            alt=""
            layout="fill"
          />
        </div>
      </main>
    </div>
  )
}
