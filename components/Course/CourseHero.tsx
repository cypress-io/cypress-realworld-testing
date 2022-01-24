import Image from "next/image"

type Props = {
  title: string
  description: string
  image: string
  children: any
}

export default function HomeHero({
  title,
  description,
  image,
  children,
}: Props) {
  return (
    <>
      <div className="relative overflow-hidden">
        <main>
          <div className="bg-jade-300 bg-course-hero bg-no-repeat bg-cover bg-center py-28">
            <div className="mx-auto w-full lg:pl-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1
                      data-test="hero-heading"
                      className="mt-4 font-bold text-5xl text-gray-1000 leading-tight"
                    >
                      {title}
                    </h1>
                    <p className="mt-3 text-base text-jade-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
                      {description}
                    </p>

                    <div className="mt-10 sm:mt-12">{children}</div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <Image
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={image}
                      alt="Course Page Hero Image"
                      layout="fill"
                    />
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
