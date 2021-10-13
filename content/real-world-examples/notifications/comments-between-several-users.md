# Comments between several users

Ready for Review: Yes
Section: Notifcations, Real World Examples
Status: Migrated
Title Approved: No

Before continuing, make sure you have read the [Notifications Overview & Setup](Notifications%20Overview%20&%20Setup%206a27a2d9b5434a229982931bf0821066.md) lesson first.

```jsx
it("User C comments on a transaction between User A and User B; User A and B get notifications that User C commented on their transaction", function () {
      cy.loginByXstate(ctx.userC.username);

      cy.database("find", "transactions", {
        senderId: ctx.userB.id,
        receiverId: ctx.userA.id,
      }).then((transaction: Transaction) => {
        cy.visit(`/transaction/${transaction.id}`);
      });

      cy.getBySelLike("comment-input").type("Thank You{enter}");

      cy.wait("@postComment");

      cy.switchUserByXstate(ctx.userA.username);
      cy.visualSnapshot("Switch to User A");
      cy.visualSnapshot(`Switch to User ${ctx.userA.username}`);

      cy.getBySelLike("notifications-link").click();

      cy.wait("@getNotifications");

      cy.getBySelLike("notification-list-item")
        .should("have.length", 9)
        .first()
        .should("contain", ctx.userC.firstName)
        .and("contain", "commented");
      cy.visualSnapshot("User A Notified of User C Comment");

      cy.switchUserByXstate(ctx.userB.username);
      cy.visualSnapshot(`Switch to User ${ctx.userB.username}`);

      cy.getBySelLike("notifications-link").click();
      cy.getBySelLike("notification-list-item")
        .should("have.length", 9)
        .first()
        .should("contain", ctx.userC.firstName)
        .and("contain", "commented");
      cy.visualSnapshot("User B Notified of User C Comment");
    });

```

You can find out more information about the custom Cypress commands used in this test [here](https://www.notion.so/RWA-Custom-Cypress-Commands-Tasks-Functions-5efc9089b2184a22910b5532796a65dd).

First, we log in as `userC`  from the `ctx` object, which we set up in the `beforeEach()` hook at the top of this spec file.

```jsx
cy.loginByXstate(ctx.userC.username);

```

![Screen Shot 2021-09-16 at 9.11.51 AM.png](Comments%20between%20several%20users%2027d107876ee84436a188698535ec1aa0/Screen_Shot_2021-09-16_at_9.11.51_AM.png)

Next, we us a custom Cypress command `cy.database()` to find transactions between `userB` and `userA`, which again come from the `ctx` object we setup in the `beforeEach()` hook at the top of this spec file. After we find a transaction, we visit that specific transaction page.

```jsx
cy.database("find", "transactions", {
        senderId: ctx.userB.id,
        receiverId: ctx.userA.id,
      }).then((transaction: Transaction) => {
        cy.visit(`/transaction/${transaction.id}`);
      });

```

![Screen Shot 2021-09-16 at 9.12.20 AM.png](Comments%20between%20several%20users%2027d107876ee84436a188698535ec1aa0/Screen_Shot_2021-09-16_at_9.12.20_AM.png)

Then, we enter a comment on the transaction page and wait on the `@postComment` intercept. Remember, this intercept happens in the `beforeEach()` at the top of this spec file.

```jsx
cy.getBySelLike("comment-input").type("Thank You{enter}");

      cy.wait("@postComment");

```

![Screen Shot 2021-09-16 at 9.12.52 AM.png](Comments%20between%20several%20users%2027d107876ee84436a188698535ec1aa0/Screen_Shot_2021-09-16_at_9.12.52_AM.png)

Next, we switch users again, this time logging in a `userA`

```jsx
cy.switchUserByXstate(ctx.userA.username);

```

![Screen Shot 2021-09-16 at 9.13.37 AM.png](Comments%20between%20several%20users%2027d107876ee84436a188698535ec1aa0/Screen_Shot_2021-09-16_at_9.13.37_AM.png)

Now that we are logged in as `userA` we click on the notifications button to view `userA`'s notifications. We also wait for the `@getNotifications` intercept. Remember, this intercept happens in the `beforeEach()` at the top of this spec file.

```jsx
cy.getBySelLike("notifications-link").click();

      cy.wait("@getNotifications");

```

![Screen Shot 2021-09-16 at 9.14.39 AM.png](Comments%20between%20several%20users%2027d107876ee84436a188698535ec1aa0/Screen_Shot_2021-09-16_at_9.14.39_AM.png)

Then, we confirm our user has a total of `9` notifications and that the first notifications contains the first name of `userC` along with the text "commented"

```jsx
cy.getBySelLike("notification-list-item")
        .should("have.length", 9)
        .first()
        .should("contain", ctx.userC.firstName)
        .and("contain", "commented");

```

![Screen Shot 2021-09-16 at 9.15.06 AM.png](Comments%20between%20several%20users%2027d107876ee84436a188698535ec1aa0/Screen_Shot_2021-09-16_at_9.15.06_AM.png)

We switch users yet again, this time logging in as `userB`

```jsx
cy.switchUserByXstate(ctx.userB.username);

```

![Screen Shot 2021-09-16 at 9.15.23 AM.png](Comments%20between%20several%20users%2027d107876ee84436a188698535ec1aa0/Screen_Shot_2021-09-16_at_9.15.23_AM.png)

We then perform similar assertions like we just did for `userA`. We want to make sure that `userB` has a total of `9` notifications and that the first notifications contains the first name of `userC` along with the text "commented"

```jsx
cy.getBySelLike("notifications-link").click();
      cy.getBySelLike("notification-list-item")
        .should("have.length", 9)
        .first()
        .should("contain", ctx.userC.firstName)
        .and("contain", "commented");

```

![Screen Shot 2021-09-16 at 9.15.41 AM.png](Comments%20between%20several%20users%2027d107876ee84436a188698535ec1aa0/Screen_Shot_2021-09-16_at_9.15.41_AM.png)