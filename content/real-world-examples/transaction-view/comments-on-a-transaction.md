# comments on a transaction

Ready for Review: Yes
Section: Real World Examples, Transaction View
Status: Migrated
Title Approved: No

Before continuing, make sure you have read the [Transaction View Overview & Setup](Transaction%20View%20Overview%20&%20Setup%20de652b8e362149babd9b8a5a787d996e.md) lesson first.

```jsx
it("comments on a transaction", function () {
    cy.getBySelLike("transaction-item").first().click();
    cy.wait("@getTransaction");

    const comments = ["Thank you!", "Appreciate it."];

    comments.forEach((comment, index) => {
      cy.getBySelLike("comment-input").type(`${comment}{enter}`);
      cy.getBySelLike("comments-list").children().eq(index).contains(comment);
    });

    cy.getBySelLike("comments-list").children().should("have.length", comments.length);
    cy.visualSnapshot("Comment on Transaction");
  });

```

You can find out more information about the custom Cypress commands used in this test [here](https://www.notion.so/RWA-Custom-Cypress-Commands-Tasks-Functions-5efc9089b2184a22910b5532796a65dd).

First, we click on the first transaction and wait upon the `@getTransaction` intercept.

```jsx
cy.getBySelLike("transaction-item").first().click();
    cy.wait("@getTransaction");

```

![Screen Shot 2021-09-16 at 9.19.47 AM.png](comments%20on%20a%20transaction%2009d701693ba5432586af2efeea7a0c7f/Screen_Shot_2021-09-16_at_9.19.47_AM.png)

Next, we loop through the array of comments, typing in each one and ensuring the comment is displayed in the UI.

```jsx
const comments = ["Thank you!", "Appreciate it."];

    comments.forEach((comment, index) => {
      cy.getBySelLike("comment-input").type(`${comment}{enter}`);
      cy.getBySelLike("comments-list").children().eq(index).contains(comment);
    });

```

![Screen Shot 2021-09-16 at 9.20.21 AM.png](comments%20on%20a%20transaction%2009d701693ba5432586af2efeea7a0c7f/Screen_Shot_2021-09-16_at_9.20.21_AM.png)

Finally, we confirm that all of our comments in the `comments` array are displayed within the UI.

```jsx
cy.getBySelLike("comments-list").children().should("have.length", comments.length);

```

![Screen Shot 2021-09-16 at 9.21.02 AM.png](comments%20on%20a%20transaction%2009d701693ba5432586af2efeea7a0c7f/Screen_Shot_2021-09-16_at_9.21.02_AM.png)