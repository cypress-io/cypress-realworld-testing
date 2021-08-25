import Image from "next/image"

export default function SectionFooter(props) {
  return (
    <div className="relative border-2">
      <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1615297925037-118f823cf4fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
          alt=""
          layout="fill"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"
        />
      </div>
      <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
            Next Course
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Testing Foundations
          </p>
          <p className="mt-3 text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
            distinctio asperiores sint porro explicabo error culpa facilis
            molestias similique! Officia repellendus, nulla laudantium ab amet
            illum odit deserunt sequi et!
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Course
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
