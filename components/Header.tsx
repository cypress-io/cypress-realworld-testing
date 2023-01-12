import { Fragment } from "react"
import dynamic from "next/dynamic"
import { Popover, Transition } from "@headlessui/react"
import MobileNav from "./Mobile/MobileNav"
import Link from "next/link"
import Image from "next/image"
import coursesJson from "../data/courses.json"
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuIcon,
  ChatAltIcon,
  FilmIcon,
  PlayIcon,
  PhoneIcon,
  CodeIcon,
  NewspaperIcon,
  UserGroupIcon,
  TemplateIcon,
  ChartBarIcon,
  CursorClickIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
} from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"

const Search = dynamic(() => import("./Search"), {
  ssr: false,
})

const company = [
  {
    name: "Cypress.io",
    href: "https://www.cypress.io/",
    icon: InformationCircleIcon,
  },
  { name: "Careers", href: "https://www.cypress.io/careers/", icon: BriefcaseIcon },
  {
    name: "Blog",
    href: "https://www.cypress.io/blog/",
    icon: NewspaperIcon,
  },
  {
    name: "Cypress Cloud",
    href: "https://www.cypress.io/cloud",
    icon: TemplateIcon,
  },
  {
    name: "Support",
    href: "https://www.cypress.io/support",
    icon: UserGroupIcon,
  },
]

const resources = [
  { name: "Docs", href: "https://docs.cypress.io/", icon: BookmarkAltIcon },
  {
    name: "Real World App",
    href: "https://github.com/cypress-io/cypress-realworld-app",
    icon: GlobeAltIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC-EOsTo2l2x39e4JmSaWNRQ",
    icon: FilmIcon,
  },
  {
    name: "Discord",
    href: "https://discord.gg/cMjUZg7",
    icon: ChatAltIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/cypress-io/cypress-realworld-testing",
    icon: CodeIcon,
  },
]

const updates = [
  {
    id: 1,
    name: "We're Hiring",
    href: "https://www.cypress.io/careers/",
    preview: "Want to help create something innovative? Join our team!",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  content: object
  courses: string[]
  progressService: object
}

export default function Header({ content, courses, progressService }: Props) {
  const coursesJsonCourses = Object.keys(coursesJson)
  return (
    <>
      <Popover className="relative hidden bg-white lg:block">
        <div
          className="pointer-events-none absolute inset-0 z-30 shadow"
          aria-hidden="true"
        />
        <div className="relative z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
            <div>
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
            <div className="md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
              <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        )}
                        data-test="courses-dropdown"
                      >
                        <span>Courses</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
                          data-test="courses-dropdown-menu"
                        >
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              {coursesJsonCourses.map((course, index) => (
                                <a
                                  key={coursesJson[course].slug}
                                  href={`/${coursesJson[course].slug}`}
                                  className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                >
                                  {/* <Image
                                    src={`/images/home/course-icons/${course}.svg`}
                                    alt="Course Icon"
                                    height={50}
                                    width={50}
                                  /> */}
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                      {`${index + 1}. ${
                                        coursesJson[course].title
                                      }`}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {coursesJson[course].description}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        )}
                      >
                        <span>Resources</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <Popover.Panel className="absolute inset-x-0 top-full z-10 hidden transform shadow-lg md:block">
                          <div className="absolute inset-0 flex">
                            <div className="w-1/2 bg-white" />
                            <div className="w-1/2 bg-gray-50" />
                          </div>
                          <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                            <nav className="grid gap-y-10 bg-white px-4 py-8 sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                              <div>
                                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                  Cypress
                                </h3>
                                <ul role="list" className="mt-5 space-y-6">
                                  {company.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                                      >
                                        <item.icon
                                          className="h-6 w-6 flex-shrink-0 text-indigo-500"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-4">
                                          {item.name}
                                        </span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                  Resources
                                </h3>
                                <ul role="list" className="mt-5 space-y-6">
                                  {resources.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                                      >
                                        <item.icon
                                          className="h-6 w-6 flex-shrink-0 text-indigo-500"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-4">
                                          {item.name}
                                        </span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </nav>
                            <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                              <div>
                                <ul role="list" className="mt-6 space-y-6">
                                  {updates.map((post) => (
                                    <li key={post.id} className="flow-root">
                                      <a
                                        href={post.href}
                                        className="-m-3 flex rounded-lg p-3 hover:bg-gray-100"
                                      >
                                        <div className="hidden flex-shrink-0 sm:block"></div>
                                        <div className="w-0 flex-1 sm:ml-8">
                                          <h4 className="truncate text-base font-medium text-gray-900">
                                            {post.name}
                                          </h4>
                                          <p className="mt-1 text-sm text-gray-500">
                                            {post.preview}
                                          </p>
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Link href="/real-world-examples">
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Real World Examples
                  </a>
                </Link>
                <Link href="/tutorials">
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Tutorials
                  </a>
                </Link>
              </Popover.Group>
              <div className="flex items-center md:ml-12">
                <Search />
              </div>
            </div>
          </div>
        </div>
      </Popover>
      <MobileNav
        content={content}
        courses={courses}
        progressService={progressService}
      />
    </>
  )
}
