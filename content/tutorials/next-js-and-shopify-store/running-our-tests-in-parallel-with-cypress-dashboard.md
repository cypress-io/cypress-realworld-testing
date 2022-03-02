# Running Our Tests in Parallel with Cypress Dashboard

## Running Our Tests in Parallel with the Cypress Dashboard

In this lesson, we will learn how to integrate the [Cypress Dashboard](https://www.cypress.io/dashboard/) with GitHub Actions so that our tests will run in parallel. The Dashboard will also provide us with greater insights into our tests which will come in handy anytime our tests fail.

You will need to signup for a free account over at [cypress.io/dashboard](https://www.cypress.io/dashboard/). We recommend using your GitHub account to register.

After creating your account and logging in, you will need to create your first project.

![Screen Shot 2021-12-17 at 9.25.02 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.25.02_AM.png)

Give your project a name and select GitHub Actions as the CI provider.

![Screen Shot 2021-12-17 at 9.25.51 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.25.51_AM.png)

Next, we will need to copy the `projectID` into the `cypress.json` file at the root of the repo.

```json
{
  "baseUrl": "http://localhost:3000",
  "viewportHeight": 1000,
  "viewportWidth": 1280,
  "projectId": "8z9iui"
}
```

![Screen Shot 2021-12-17 at 9.26.57 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.26.57_AM.png)

Then we will need to copy the record key and add it to GitHub secrets.

![Screen Shot 2021-12-17 at 9.28.22 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.28.22_AM.png)

![Screen Shot 2021-12-17 at 9.28.34 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.28.34_AM.png)

![Screen Shot 2021-12-17 at 9.29.12 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.29.12_AM.png)

Finally, we will need to add some environment variables to the GitHub Actions config file.

```yaml
CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
# pass GitHub token to allow accurately detecting a build vs a re-run build
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

We also need to add `record: true` underneath the `wait-on:` directive. This will tell the dashboard to record our test runs.

![Screen Shot 2021-12-17 at 9.36.28 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.36.28_AM.png)

The entire GitHub Actions workflow file should look like this:

```yaml
name: E2E on Chrome

on: [push]

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Cypress run
        uses: cypress-io/github-action@v2
        with:
          browser: chrome
          build: npm run build
          start: npm run start
          wait-on: 'http://localhost:3000'
          record: true
        env:
          COMMERCE_PROVIDER: ${{ secrets.COMMERCE_PROVIDER }}
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN }}
          NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          # pass GitHub token to allow accurately detecting a build vs a re-run build
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Note that we are passing the `GITHUB_TOKEN` as well. This does not need to be in our GitHub secrets, GitHub will handle this for us. It is used by the dashboard to detect a build vs a re-run build.

Save your changes and push them up to GitHub.

```bash
git add .
git commit -m "added Cypress dashboard projectID and env vars to GHA config"
git push origin github-actions-cypress-tests
```

If you check the Cypress dashboard you should see the latest runs.

![Screen Shot 2021-12-17 at 9.41.53 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.41.53_AM.png)

After clicking on it, you can then inspect the test results.

![Screen Shot 2021-12-17 at 9.42.36 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_9.42.36_AM.png)

Now that our tests are hooked up to the dashboard we can easily inspect each test whenever there is a failure. The dashboard will provide a screenshot of the exact point of failure and even a video that we can watch to see exactly where and why our tests failed.

## Running our Tests in Parallel

In order to have our tests run in parallel, we have to make some changes to our GitHub Actions config file. We will be splitting the config into two separate jobs. The first job will be responsible for building the Next.js application and caching it. The second job will execute our tests in parallel across multiple machines. 

We are doing this because our tests will be run on multiple machines, and we do not want each machine to have to install our application and its dependencies on every machine. Instead, we will have a single install job that caches our built application and its dependencies which can then be referenced and used by the machines running our tests. Doing it this way will save a significant amount of time as our dependencies and application will only need to be installed and built once.

## Install Job

Let’s first create the install job.

```yaml
name: E2E on Chrome

on: [push]

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Cypress install
        uses: cypress-io/github-action@v2
        with:
          runTests: false
          
      - run: npm run build
        env:
          COMMERCE_PROVIDER: ${{ secrets.COMMERCE_PROVIDER }}
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN }}
          NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}

      - name: Save build folder
        uses: actions/upload-artifact@v2
        with:
          name: build
          if-no-files-found: error
          path: build
```

The updated install job is similar to what we had previously, with some important modifications. Let’s review all of the steps of this job in order.

First, we are using [GitHub’s checkout action](https://github.com/actions/checkout) to check out the code in our repo into the GitHub Actions pipelines. This allows our workflow access to the code in our repo.

```yaml
- name: Checkout
  uses: actions/checkout@v2
```

Next, we use the official [Cypress GitHub Action](https://github.com/cypress-io/github-action) to install all of our applications dependencies. Notice how we added `runTests: false` to this step which will prevent this action from running our Cypress tests. We are only concerned with installing our app’s dependencies in this job and do not want our Cypress tests to be run just yet.

```yaml
- name: Cypress install
  uses: cypress-io/github-action@v2
  with:
    runTests: false
```

Then, we build our application and pass in the necessary environment variables. Our application needs these variables to access our Shopify store so that our pages are built with the products in our Shopify store. 

```yaml
- run: npm run build
        env:
          COMMERCE_PROVIDER: ${{ secrets.COMMERCE_PROVIDER }}
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN }}
          NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}
```

Finally, we use the official [GitHub Upload Artifact action](https://github.com/actions/upload-artifact) which, “... uploads artifacts from your workflow allowing you to share data between jobs and store data once a workflow is complete.” This step will cache our built application so that our parallel test machines can access it.

```yaml
- name: Save build folder
        uses: actions/upload-artifact@v2
        with:
          name: build
          if-no-files-found: error
          path: build
```

## Test Job

Next, we will create the test job which will run our tests. This job is responsible for executing our Cypress tests in parallel across multiple machines.

```yaml
ui-chrome-tests:
    runs-on: ubuntu-latest
    needs: install
    strategy:
      fail-fast: false
      matrix:
        containers: [1, 2, 3]
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Download the build folders
        uses: actions/download-artifact@v2
        with:
          name: build
          path: build

      - name: "Chrome E2E Tests"
        uses: cypress-io/github-action@v2
        with:
          start: npm run start
          wait-on: "http://localhost:3000"
          browser: chrome
          record: true
          parallel: true
          spec: cypress/integration/*
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

 Let’s break this down and see how it works.

First, we give our job a name, “ui-chome-tests” and tell GitHub Actions to run this job on the latest version of Ubuntu. We also specify that this job is dependent upon our “install” job.

```yaml
ui-chrome-tests:
    runs-on: ubuntu-latest
    needs: install
```

Next, we tell GitHub Actions our strategy for parallelization. The `fail-fast: false` will prevent other machines running in parallel from being canceled if one of our tests fails. If one of our tests fails in one of the machines, we do not want the other machines currently running in parallel to be canceled because of it. Only the machine with the failing test should be canceled.

The matrix directive tells GitHub how many containers we would like to use, which in this case is 3. So, GitHub will spin up a maximum of 3 containers to run our tests in parallel.

```yaml
strategy:
      fail-fast: false
      matrix:
        containers: [1, 2, 3]
```

Next, we use the GitHub Checkout action again, to check out our repo’s code into each container.

```yaml
- name: Checkout
        uses: actions/checkout@v2
```

Then, we use the Download Artifacts action to access the cached build folder from the previous install job.

```yaml
- name: Download the build folders
        uses: actions/download-artifact@v2
        with:
          name: build
          path: build
```

Then, we run the local web server for our application and execute our Cypress tests. Notice that this time we added `parallel: true` which lets the dashboard know to run these tests in parallel. The dashboard is responsible for orchestrating parallelization and will determine which tests are run inside of which containers.

```yaml
- name: "Chrome E2E Tests"
        uses: cypress-io/github-action@v2
        with:
          start: npm run start
          wait-on: "http://localhost:3000"
          browser: chrome
          record: true
          parallel: true
          spec: cypress/integration/*
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Final GitHub Actions Workflow Config

The final GitHub Actions Workflow file should look like this:

```yaml
name: E2E on Chrome

on: [push]

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Cypress install
        uses: cypress-io/github-action@v2
        with:
          runTests: false
          
      - run: npm run build
        env:
          COMMERCE_PROVIDER: ${{ secrets.COMMERCE_PROVIDER }}
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN }}
          NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}

      - name: Save build folder
        uses: actions/upload-artifact@v2
        with:
          name: build
          if-no-files-found: error
          path: build
  
  ui-chrome-tests:
    runs-on: ubuntu-latest
    needs: install
    strategy:
      fail-fast: false
      matrix:
        containers: [1, 2, 3]
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Download the build folders
        uses: actions/download-artifact@v2
        with:
          name: build
          path: build

      - name: "Chrome E2E Tests"
        uses: cypress-io/github-action@v2
        with:
          start: npm run start
          wait-on: "http://localhost:3000"
          browser: chrome
          record: true
          parallel: true
          spec: cypress/integration/*
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Now that we have split up our workflow into multiple jobs, the install job will run first.

![Screen Shot 2021-12-17 at 10.09.51 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_10.09.51_AM.png)

Once the install job is complete our tests will be run in parallel on multiple machines.

![Screen Shot 2021-12-17 at 10.13.33 AM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_10.13.33_AM.png)

All of our tests are passing and finished in a fraction of the time since we have them running in parallel now.

![Screen Shot 2021-12-17 at 1.36.55 PM.png](Running%20Ou%20fcd81/Screen_Shot_2021-12-17_at_1.36.55_PM.png)

## Real World App

![rwa-readme-screenshot.png](Running%20Ou%20fcd81/rwa-readme-screenshot.png)

If you would like to see how the dashboard integrates with a real-world application, check out the [Real World](https://github.com/cypress-io/cypress-realworld-app) App created by the Cypress team. The Real World App (RWA) is a payment application to demonstrate **real-world** usage of [Cypress](https://cypress.io/) testing methods, patterns, and workflows. The Cypress dashboard for this application is open to the public so feel free to inspect both old and new PR’s to see how things work together.  

[https://github.com/cypress-io/cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app/blob/develop/.github/workflows/main.yml)