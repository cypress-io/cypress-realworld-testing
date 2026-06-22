# Real World Testing with Cypress

Real World Testing with Cypress is a free and open source testing curriculum built with [Next.js](https://nextjs.org) by the team at [Cypress](https://www.cypress.io/). Start learning today at [learn.cypress.io](https://learn.cypress.io/).

<a href="https://learn.cypress.io/">
  <img width="1384" alt="Real World Testing with Cypress" src="https://user-images.githubusercontent.com/1271364/159762994-cf77ccad-307b-4d93-9871-b0452f967df4.png">
</a>

## Prerequisites

- [Node.js](https://nodejs.org/) (see [`.nvmrc`](./.nvmrc) for the version used by this project)
- [Yarn](https://classic.yarnpkg.com/)

## Installation

```bash
# Clone the repository
git clone https://github.com/cypress-io/cypress-realworld-testing.git

cd cypress-realworld-testing

# Install dependencies
yarn install

# Start the Next.js dev server (http://localhost:3000)
yarn dev
```

To create and run a production build locally:

```bash
yarn build
yarn start
```

## Documentation

Internal documentation for this project lives in the [`/docs`](./docs) folder and is powered by [VuePress](https://vuepress.vuejs.org/). To view it, run:

```bash
yarn docs:dev
```

This starts a local server and serves the docs site.

## Linting

Lint the codebase with [ESLint](https://eslint.org/) (via `next lint`):

```bash
yarn lint
```

## Unit Tests

The unit tests cover the project's [XState](https://xstate.js.org/) machines and related utilities. They are powered by [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/), live in the [`/tests`](./tests) folder, and can be run with:

```bash
yarn test:unit
```

## Cypress End-to-End Tests

The end-to-end tests live in [`cypress/e2e`](./cypress/e2e). Open the Cypress app to run them interactively:

```bash
yarn cypress:open
```

Run the same tests headlessly, as they would run in CI:

```bash
yarn cypress:run
```

To run the tests against a mobile viewport, use the mobile variants:

```bash
yarn cypress:open:mobile
yarn cypress:run:mobile
```

> **Note:** The end-to-end tests run against the application, so make sure the dev server (`yarn dev`) is running first.
