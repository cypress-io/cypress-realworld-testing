# Unauthenticated Users

Diataxis Type: How-To Guide
Ready for Review: Yes
Reviewed By: Kevin
Reviewed By Kevin: September 28, 2021
Section: Auth, Real World Examples
Status: Migrated
Title Approved: Yes

Before continuing, make sure you have read the [Authentication Overview & Setup](Authentication%20Overview%20&%20Setup%203f4e2a27b6434a27bdadcd217d85397b.md) lesson first.

```jsx
it("should redirect unauthenticated user to signin page", function () {
  cy.visit("/personal");
  cy.location("pathname").should("equal", "/signin");
});
```

First, we attempt to `.visit()` the URL `/personal`, a protected route that only logged-in users can access.

```jsx
cy.visit("/personal");
```

Finally, we assert that the application redirects users who are not logged in back to the `/signin` page.

```jsx
cy.location("pathname").should("equal", "/signin");
```

![Unauthenticated%20Users%20accc99a0f4524f799a394c7d25134597/Screen_Shot_2021-06-28_at_1.35.44_PM.png](Unauthenticated%20Users%20accc99a0f4524f799a394c7d25134597/Screen_Shot_2021-06-28_at_1.35.44_PM.png)

This is a straightforward test, but it is testing some critical functionality, as we do not want unauthorized users to gain access to our application. Now we can be confident that any unauthorized users will be automatically redirected to the Sign-in page.