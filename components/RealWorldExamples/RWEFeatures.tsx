import Image from "next/image"

const features = [
  {
    name: "How to Test Authentication",
    icon: "authentication.svg",
    description: "Learn how to test authentication in multiple ways",
  },
  {
    name: "Custom Cypress Commands",
    icon: "custom-commands.svg",
    description: "The correct abstractions for reusability in your tests",
  },
  {
    name: "How to Test Mobile and Desktop",
    icon: "desktop.svg",
    description: "Execute your test code depending upon viewport size",
  },
  {
    name: "Data Driven Testing",
    icon: "db.svg",
    description: "Learn how to drive tests with data from an external source",
  },
  {
    name: "How to Create Tests Dynamically",
    icon: "dynamic-tests.svg",
    description:
      "Use loops and libraries like lodash to dynamically generate test cases",
  },
  {
    name: "How to Test GraphQL",
    icon: "graphql.svg",
    description: "How to test various GraphQl queries and mutations",
  },
]

export default function RWEFeatures() {
  return (
    <div className="features relative bg-indigo-400 py-16 sm:py-24 lg:py-16">
      <div className="mx-auto max-w-md px-4  sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <p className="mt-2 text-3xl font-extrabold text-gray-50 tracking-tight sm:text-4xl">
          What you&apos;ll learn
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="bg-gray-50 rounded-lg px-6 py-8">
                  <Image
                    className="h-8 w-auto sm:h-10"
                    src={`/images/real-world-examples/features/${feature.icon}`}
                    alt="Cypress Logo"
                    height={62}
                    width={75}
                  />
                  <h3 className="mt-4 text-lg font-medium text-gray-900 tracking-tight">
                    {feature.name}
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
