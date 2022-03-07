import Link from "next/link"
import Image from "next/image"
import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import MobileCourses from "./MobileCourses"
import { XIcon } from "@heroicons/react/outline"

type Props = {
  content: object
  courses: string[]
  progressService: object
}

export default function MobileProgressMenu({
  content,
  courses,
  progressService,
}: Props) {
  return (
    <Popover className="relative bg-white lg:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:space-x-10 lg:justify-start">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a className="flex">
                <span className="sr-only">Workflow</span>
                <Image
                  className="h-8 w-auto sm:h-10"
                  src="/images/logo/logo.svg"
                  alt="Cypress Logo"
                  height={40}
                  width={120}
                />
              </a>
            </Link>
          </div>
          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <Popover.Button
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              data-test="mobile-menu-button"
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </Popover.Button>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition lg:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    className="h-8 w-auto sm:h-10"
                    src="/images/logo/logo.svg"
                    alt="Cypress Logo"
                    height={40}
                    width={120}
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <MobileCourses
                  courses={courses}
                  content={content}
                  progressService={progressService}
                />
              </div>
              <hr className="my-8" />
              <div>
                <Link href="/real-world-examples">
                  <a>
                    <span className="sr-only">Workflow</span>
                    <Image
                      className="h-8 w-auto sm:h-10"
                      src="https://raw.githubusercontent.com/cypress-io/cypress-realworld-app/develop/public/img/rwa-readme-screenshot.png"
                      alt="Cypress Logo"
                      height={153}
                      width={358}
                    />
                  </a>
                </Link>
              </div>
              <div className="relative overflow-hidden bg-white pt-16">
                <div className="mx-auto max-w-lg">
                  <Link href="/real-world-examples">
                    <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Real World Examples
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
