type Props = {
  title: string
  description: string
  image: string
}

export default function CourseHero({ title, description, image }: Props) {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <span className="mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">{title}</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {description}
              </p>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <img className="w-full rounded-lg" src={image} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
