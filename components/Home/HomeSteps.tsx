/* This example requires Tailwind CSS v2.0+ */
import React from "react"
import Slider from "react-slick"
import HomeCard from "./HomeCard"
import { CheckIcon } from "@heroicons/react/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function HomeSteps(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {props.sections.map((section, index) => (
          <li
            key={section}
            className={classNames(
              index !== props.sections.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {props.content[section].status === "Completed" ? (
              <>
                {index !== props.sections.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="h-9 flex items-center">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <div key={props.content[section].title} className="my-12">
                  <div className="section-title flex items-center">
                    <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                      {props.content[section].title}
                    </h1>
                    <span className="ml-8">
                      {props.content[section].children.length} Lessons
                    </span>
                  </div>

                  <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-12">
                    {props.content[section].description}
                  </p>

                  <Slider {...settings}>
                    {props.content[section].children.map((lesson) => (
                      <div key={lesson.title}>
                        <HomeCard lesson={lesson} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </>
            ) : props.content[section].status === "Current" ? (
              <>
                {index !== props.sections.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="h-9 flex items-center" aria-hidden="true">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                    <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                  </span>
                </span>
                <div key={props.content[section].title} className="my-12">
                  <div className="section-title flex items-center">
                    <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                      {props.content[section].title}
                    </h1>
                    <span className="ml-8">
                      {props.content[section].children.length} Lessons
                    </span>
                  </div>

                  <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-12">
                    {props.content[section].description}
                  </p>

                  <Slider {...settings}>
                    {props.content[section].children.map((lesson) => (
                      <div key={lesson.title}>
                        <HomeCard lesson={lesson} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </>
            ) : (
              <>
                {index !== props.sections.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="h-9 flex items-center" aria-hidden="true">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                    <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                  </span>
                </span>
                <div key={props.content[section].title} className="my-12">
                  <div className="section-title flex items-center">
                    <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                      {props.content[section].title}
                    </h1>
                    <span className="ml-8">
                      {props.content[section].children.length} Lessons
                    </span>
                  </div>

                  <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-12">
                    {props.content[section].description}
                  </p>

                  <Slider {...settings}>
                    {props.content[section].children.map((lesson) => (
                      <div key={lesson.title}>
                        <HomeCard lesson={lesson} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
