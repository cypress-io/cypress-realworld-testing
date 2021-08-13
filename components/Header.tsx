/* This example requires Tailwind CSS v2.0+ */
import { Popover } from "@headlessui/react"

import Link from "next/link"
import { SearchIcon } from "@heroicons/react/solid"

export default function Header() {
  return (
    <div className="relative bg-gray-50">
      <Popover className="relative bg-white shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <Link href="/">
                    <a>Real World Testing</a>
                  </Link>
                </div>

                <div className="md:flex items-center justify-end">
                  {/* Search */}
                  <div className="flex-1 min-w-0">
                    <div className="max-w-xs w-full mx-auto">
                      <label htmlFor="desktop-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="desktop-search"
                          className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border rounded-md leading-5 text-gray-900 focus:outline-none focus:bg-opacity-100 focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>
    </div>
  )
}
