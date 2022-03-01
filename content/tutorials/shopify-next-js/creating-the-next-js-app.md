# Creating the Next.js App

## Creating the Next.js App

Now that our Shopify store is all setup and configured we will need to create the Next.js front-end for it. Fortunately, the amazing team at Vercel has already provided us with a project which we can use for our store. 

We will be using the Next.js Commerce application, which you can find more about [here](https://nextjs.org/commerce).

## Cloning & Installing the App

First, you will need to fork the [Next.js Commerce Repo](https://github.com/vercel/commerce). Once you have forked their repo, you will need to clone it down locally to your machine.

```bash
git clone git@github.com:<YOUR GITHUB USERNAME>/commerce.git
```

![Screen Shot 2022-01-03 at 12.24.44 PM.png](Creating%20t%20f2f7b/Screen_Shot_2022-01-03_at_12.24.44_PM.png)

Then `cd` into the repo.

```bash
cd commerce
```

Install all of the NPM dependencies with npm

```bash
npm install
```

<aside>
💡 Do not use Yarn to install the dependencies. At the time of writing this there was an issue where Yarn was not properly installing all of the dependencies, so please just use NPM.

</aside>

Next, create a file called `.env.local` at the root of the repo.

Add in the following env variables.

```bash
COMMERCE_PROVIDER=shopify
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=xxxxxxx.myshopify.com
```

You will need to paste in your StoreFront API Access token from the private app we created within Shopify, as well as your store's URL.

![Screen Shot 2021-12-16 at 9.56.41 AM.png](Creating%20t%20f2f7b/Screen_Shot_2021-12-16_at_9.56.41_AM.png)

Next, within the `tsconfig.json` file update the following lines around ~26 & 27

```json
"@framework": ["framework/local"],
"@framework/*": ["framework/local/*"]
```

to:

```json
"@framework": ["framework/shopify"],
"@framework/*": ["framework/shopify/*"]
```

![Screen Shot 2021-12-16 at 9.59.58 AM.png](Creating%20t%20f2f7b/Screen_Shot_2021-12-16_at_9.59.58_AM.png)

and save the file.

Next, within your terminal start up the development server.

```bash
npm run dev
```

Open your browser to `[http://localhost:3000](http://localhost:3000)` and you should see your store and your products from Shopify.

![Screen Shot 2021-12-16 at 10.04.09 AM.png](Creating%20t%20f2f7b/Screen_Shot_2021-12-16_at_10.04.09_AM.png)