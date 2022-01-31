import {
  DesktopComputerIcon,
  CogIcon,
  LockClosedIcon,
  DatabaseIcon,
  LightningBoltIcon,
  CodeIcon,
} from "@heroicons/react/outline"

const features = [
  {
    name: "How to Test Authentication",
    icon: LockClosedIcon,
    description: "Learn how to test authentication in multiple ways",
  },
  {
    name: "Custom Cypress Commands",
    icon: CogIcon,
    description: "The correct abstractions for reusability in your tests",
  },
  {
    name: "How to Test Mobile and Desktop",
    icon: DesktopComputerIcon,
    description: "Execute your test code depending upon viewport size",
  },
  {
    name: "Data Driven Testing",
    icon: DatabaseIcon,
    description: "Learn how to drive tests with data from an external source",
  },
  {
    name: "How to Create Tests Dynamically",
    icon: CodeIcon,
    description:
      "Use loops and libraries like lodash to dynamically generate test cases",
  },
  {
    name: "How to Test GraphQL",
    icon: LightningBoltIcon,
    description: "How to test various GraphQl queries and mutations",
  },
]

export default function RWEFeatures() {
  return (
    <div className="features relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base font-semibold uppercase tracking-wider text-blue-500">
          What&apos;s Inside
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A quick preview of what you’ll learn from our examples
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-blue-500 p-3 shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
