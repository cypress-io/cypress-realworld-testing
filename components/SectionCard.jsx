import Image from 'next/image'

export default function SectionCard(props) {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="lg:col-span-2">
            <ul className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0">
                <li key={props.lesson.slug} className="sm:py-8">
                  <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                    <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                      <Image
                        className="object-cover shadow-lg rounded-lg"
                        src="https://source.unsplash.com/1600x900/?testing"
                        alt=""
                        layout="fill"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="space-y-4">
                        <div className="text-lg leading-6 font-medium space-y-1">
                          <h3>{props.lesson.title}</h3>
                        </div>
                        <div className="text-lg">
                          <p className="text-gray-500">{props.lesson.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
