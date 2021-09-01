import Image from "next/image"

export default function SectionHero(props) {
  return (
    <div className="relative bg-gradient-to-r from-purple-800 to-indigo-700">
      <main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">
                Testing Your First Application
              </span>{" "}
              {/* <span className="block text-indigo-600 xl:inline">online business</span> */}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-purple-200 sm:text-xl md:mt-5 md:max-w-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              accusamus, quae quaerat deleniti repudiandae dicta nesciunt eos
              facilis maxime cumque commodi magnam debitis eum. Debitis maxime
              aperiam dolorem iusto expedita?
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
