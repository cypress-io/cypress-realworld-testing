# Authentication Overview & Setup

Ready for Review: Yes
Reviewed By: Kevin
Reviewed By Kevin: September 28, 2021
Section: Auth, Real World Examples
Status: Migrated
Title Approved: Yes

In this section, we will be discussing the various tests located within the `cypress/tests/ui/auth.spec.ts` file.

Let's break down what is happening within the `beforeEach()`  as it is important to understand what is going on since this hook is running before each test.

## beforeEach()

```jsx
beforeEach(function () {
    cy.task("db:seed");

    cy.intercept("POST", "/users").as("signup");
    cy.intercept("POST", apiGraphQL, (req) => {
      const { body } = req;

      if (body.hasOwnProperty("operationName") && body.operationName === "CreateBankAccount") {
        req.alias = "gqlCreateBankAccountMutation";
      }
    });
  });
```

You can find out more information about the custom Cypress commands used [here](https://www.notion.so/RWA-Custom-Cypress-Commands-Tasks-Functions-5efc9089b2184a22910b5532796a65dd).

The first thing that happens inside of this hook is a custom task we have created called `db:seed` which is responsible for seeding our database.

```jsx
cy.task("db:seed");
```

Next, we are using `cy.intercept()` to intercept every `POST` request to the `/users` route. We are then aliasing this intercept to "signup." When you see `@signup` being used within a test, it is referring to this intercept.

```jsx
cy.intercept("POST", "/users").as("signup");
```

Finally, we are using `cy.intercept()` to intercept every `POST` request to our GraphQL API endpoint. Within the body of this intercept, we have a conditional to check to see if the GraphQL `operationName` is equal to "CreateBankAccount," if so, we are creating an alias to this intercept as `gqlCreateBankAccountMutation` . When you see `@gqlCreateBankAccountMutation` being used within a test, it is referring to this intercept.