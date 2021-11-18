import Image from "next/image"

const features = [
  {
    name: "Prepare your Testing Mindset",
    icon: "mindset.svg",
    description:
      "Build a healthy mental model before testing your applications.",
  },
  {
    name: "Learn What to Test",
    icon: "knowing-what-to-test.svg",
    description: "Prioritize what parts of your application to test.",
  },
  {
    name: "Debug Failing Tests Efficiently",
    icon: "debug.svg",
    description:
      "Learn various tips, methods and techniques to help you better debug your failing tests",
  },
  {
    name: "Learn Database Initialization & Seeding",
    icon: "db.svg",
    description:
      "Get practical guidance on how to create the data you need for your tests.",
  },
  {
    name: "Understand Different Testing Types",
    icon: "types-of-testing.svg",
    description:
      "Learn the difference between unit, integration and end-to-end tests.",
  },
  {
    name: "Apply your Knowledge",
    icon: "how-to-test.svg",
    description:
      "Practice how to test different apps in the real world, from simple to complex.",
  },
]

export default function HomeFeatures() {
  return (
    <div className="features relative bg-teal-500 py-16 sm:py-24 lg:py-16">
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
                    src={`/images/home/${feature.icon}`}
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
