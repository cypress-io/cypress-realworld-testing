export default function HomeCard(props) {
  return (
    <>
      <div className="relative max-w-7xl mx-auto mb-12">
        <button
          type="button"
          className="absolute -top-4 -left-6 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {props.lesson.status}
        </button>
        <div className="max-w-xs">
          <div
            key={props.lesson.title}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex-shrink-0">
              {/* <img
                className="h-48 w-full object-cover"
                src={post.imageUrl}
                alt=""
              /> */}
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                {/* <p className="text-sm font-medium text-indigo-600">
                  <a href={post.category.href} className="hover:underline">
                    {post.category.name}
                  </a>
                </p> */}
                <a href="#" className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">
                    {props.lesson.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {props.lesson.description}
                  </p>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                {/* <div className="flex-shrink-0">
                  <a href={post.author.href}>
                    <span className="sr-only">{post.author.name}</span>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post.author.imageUrl}
                      alt=""
                    />
                  </a>
                </div> */}
                <div className="ml-3">
                  {/* <p className="text-sm font-medium text-gray-900">
                    <a href={post.author.href} className="hover:underline">
                      {post.author.name}
                    </a>
                  </p> */}
                  {/* <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={post.datetime}>{post.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime} read</span>
                  </div> */}

                  <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Start Lesson
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
