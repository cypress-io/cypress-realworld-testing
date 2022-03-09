import Image from "next/image"

export default function RWEHero() {
  return (
    <>
      <div className="relative overflow-hidden">
        <main>
          <div className="bg-jade-300 bg-course-hero bg-cover bg-center bg-no-repeat py-28">
            <div className="mx-auto w-full lg:pl-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                  <div className="lg:py-24">
                    <h1
                      data-test="hero-heading"
                      className="mt-4 text-center text-5xl font-bold leading-tight text-gray-1000 lg:text-left"
                    >
                      Real World Examples
                    </h1>
                    {/* <p className="mt-3 text-base text-jade-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
                      Learn cool stuff.
                    </p> */}
                  </div>
                </div>

                <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
                  <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <div className="hidden sm:block"></div>
                    <div className="text-center">
                      <Image
                        className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                        src="/images/home/real-world-app.svg"
                        alt="Real World Examples Hero Image"
                        width={667}
                        height={488}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
