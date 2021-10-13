# Invalid Users

Diataxis Type: How-To Guide
Ready for Review: Yes
Reviewed By: Kevin
Reviewed By Kevin: September 28, 2021
Section: Auth, Real World Examples
Status: Migrated
Title Approved: Yes

Before continuing, make sure you have read the [Authentication Overview & Setup](Authentication%20Overview%20&%20Setup%203f4e2a27b6434a27bdadcd217d85397b.md) lesson first.

```jsx
it("should error for an invalid user", function () {
    cy.login("invalidUserName", "invalidPa$$word");

    cy.getBySel("signin-error")
      .should("be.visible")
      .and("have.text", "Username or password is invalid");
    cy.visualSnapshot("Sign In, Invalid Username and Password, Username or Password is Invalid");
  });
```

You can find out more information about the custom Cypress commands used in this test [here](https://www.notion.so/RWA-Custom-Cypress-Commands-Tasks-Functions-5efc9089b2184a22910b5532796a65dd).

First, we are using `cy.login()`, a Custom Cypress Command to use the Sign In UI to log in as a user with an invalid username and password.

```jsx
cy.login("invalidUserName", "invalidPa$$word");
```

Finally, we confirm the error is displayed. The correct error message is shown with a chained expectation that the error is visible and has a specific error message.

```jsx
cy.getBySel("signin-error")
  .should("be.visible")
  .and("have.text", "Username or password is invalid");
```

![Invalid%20Users%205b2257d329af4c45b88a1debe7252ae3/Screen_Shot_2021-06-28_at_1.50.00_PM.png](Invalid%20Users%205b2257d329af4c45b88a1debe7252ae3/Screen_Shot_2021-06-28_at_1.50.00_PM.png)