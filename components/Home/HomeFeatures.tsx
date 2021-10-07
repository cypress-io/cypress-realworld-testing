import {
  LightBulbIcon,
  BeakerIcon,
  TerminalIcon,
  DatabaseIcon,
  CodeIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline"

const features = [
  {
    name: "Testing Mindset",
    icon: LightBulbIcon,
    description: "The mindset necessary when testing applications.",
  },
  {
    name: "Knowing What to Test",
    icon: BeakerIcon,
    description: "Know which parts of your application you should test.",
  },
  {
    name: "How to Debug Failing Tests",
    icon: TerminalIcon,
    description:
      "Various tips, methods and techniques to help you debug your failing tests",
  },
  {
    name: "Database Initialization & Seeding",
    icon: DatabaseIcon,
    description: "How to create the data you need for your tests",
  },
  {
    name: "Types of Testing",
    icon: CodeIcon,
    description:
      "The difference between unit, integration and end to end tests",
  },
  {
    name: "How to Test",
    icon: AdjustmentsIcon,
    description: "How to tests different apps from simple to complex",
  },
]

export default function HomeFeatures() {
  return (
    <div className="features relative bg-white py-16 sm:py-24 lg:py-16">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-blue-500 uppercase">
          What&apos;s Inside
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          A quick preview of what you’ll learn
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
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
