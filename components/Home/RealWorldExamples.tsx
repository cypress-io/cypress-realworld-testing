/* This example requires Tailwind CSS v2.0+ */
import { InboxIcon, SparklesIcon } from "@heroicons/react/outline"
// import LessonSteps from "./LessonSteps"

export default function RealWorldExamples() {
  return (
    <>
      <hr />
      <div className="relative pt-16 overflow-hidden sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
          <div>
            {/* <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
              Serverless
            </h2> */}
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Real World Examples
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              A payment application to demonstrate real-world usage of Cypress
              testing methods, patterns, and workflows.
            </p>
          </div>
          <div className="mt-12">
            <img
              src="https://raw.githubusercontent.com/cypress-io/cypress-realworld-app/develop/public/img/rwa-readme-screenshot.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="relative bg-white pt-16 pb-32 overflow-hidden">
        <div className="relative">
          <div className="lg:mx-20 lg:max-w-full lg:px-8 lg:grid lg:grid-cols-7 lg:grid-flow-col-dense lg:gap-8">
            {/* Authentication */}
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                    Authentication
                  </h2>
                  {/* <LessonSteps /> */}
                </div>
              </div>
            </div>

            {/* Bank Accounts */}
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                    Bank Accounts
                  </h2>
                  {/* <LessonSteps /> */}
                </div>
              </div>
            </div>

            {/* New Transactions */}
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                    New Transactions
                  </h2>
                  {/* <LessonSteps /> */}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                    Notifications
                  </h2>
                  {/* <LessonSteps /> */}
                </div>
              </div>
            </div>

            {/* Transaction Feed */}
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                    Transaction Feed
                  </h2>
                  {/* <LessonSteps /> */}
                </div>
              </div>
            </div>

            {/* Transaction View */}
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                    Transaction View
                  </h2>
                  {/* <LessonSteps /> */}
                </div>
              </div>
            </div>

            {/* User Settings */}
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                    User Settings
                  </h2>
                  {/* <LessonSteps /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
