# renders an empty notifications state

Ready for Review: Yes
Section: Notifcations, Real World Examples
Status: Migrated
Title Approved: No

Before continuing, make sure you have read the [Notifications Overview & Setup](Notifications%20Overview%20&%20Setup%206a27a2d9b5434a229982931bf0821066.md) lesson first.

```jsx
it("renders an empty notifications state", function () {
    cy.intercept("GET", "/notifications", []).as("notifications");

    cy.loginByXstate(ctx.userA.username);

    if (isMobile()) {
      cy.getBySel("sidenav-toggle").click();
    }
    cy.getBySel("sidenav-notifications").click();
    cy.location("pathname").should("equal", "/notifications");
    cy.getBySel("notification-list").should("not.exist");
    cy.getBySel("empty-list-header").should("contain", "No Notifications");
    cy.visualSnapshot("No Notifications");
  });

```

You can find out more information about the custom Cypress commands used in this test [here](https://www.notion.so/RWA-Custom-Cypress-Commands-Tasks-Functions-5efc9089b2184a22910b5532796a65dd).

First, we use `cy.intercept()` to intercept any `GET` request to the `/notifications` route. If you look closely, we are also passing in an empty array `[]` as a [3rd argument](https://docs.cypress.io/api/commands/intercept#Arguments) which will set the response data to be this empty array. The reason for this is we are trying to test what happens when a user does not have any notifications. The intercept is aliased to `@notifications`

```jsx
cy.intercept("GET", "/notifications", []).as("notifications");

```

Then, we use another custom Cypress command `cy.loginByXstate()` to log in as one of the users which we retrieved in the `beforeEach()` hook at the top of this spec file.

```jsx
cy.loginByXstate(ctx.userA.username);

```

![Screen Shot 2021-09-16 at 9.09.45 AM.png](renders%20an%20empty%20notifications%20state%2002a9c2ecadf24c63852cfc7a56411f2e/Screen_Shot_2021-09-16_at_9.09.45_AM.png)

If this test is being run in a mobile viewport, we click on the button to toggle the sidebar.

```jsx
if (isMobile()) {
      cy.getBySel("sidenav-toggle").click();
    }

```

Next, we click on the "Notifications" button in the sidebar and verify the app has routed us to the notifications screen.

```jsx
cy.getBySel("sidenav-notifications").click();
    cy.location("pathname").should("equal", "/notifications");

```

![Screen Shot 2021-09-16 at 9.10.15 AM.png](renders%20an%20empty%20notifications%20state%2002a9c2ecadf24c63852cfc7a56411f2e/Screen_Shot_2021-09-16_at_9.10.15_AM.png)

Finally, we verify that there are not any notifications in the `DOM` and that the screen displays the correct text letting the user know there are no notifications.

```jsx
cy.getBySel("notification-list").should("not.exist");
    cy.getBySel("empty-list-header").should("contain", "No Notifications");

```

![Screen Shot 2021-09-16 at 9.10.31 AM.png](renders%20an%20empty%20notifications%20state%2002a9c2ecadf24c63852cfc7a56411f2e/Screen_Shot_2021-09-16_at_9.10.31_AM.png)