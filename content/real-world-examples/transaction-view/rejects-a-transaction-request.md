# rejects a transaction request

Ready for Review: Yes
Section: Real World Examples, Transaction View
Status: Migrated
Title Approved: No

Before continuing, make sure you have read the [Transaction View Overview & Setup](Transaction%20View%20Overview%20&%20Setup%20de652b8e362149babd9b8a5a787d996e.md) lesson first.

```jsx
it("rejects a transaction request", function () {
    cy.visit(`/transaction/${ctx.transactionRequest!.id}`);
    cy.wait("@getTransaction");

    cy.getBySelLike("reject-request").click();
    cy.wait("@updateTransaction").its("response.statusCode").should("equal", 204);
    cy.getBySelLike("reject-request").should("not.exist");
    cy.getBySel("transaction-detail-header").should("be.visible");
    cy.visualSnapshot("Transaction Rejected");
  });

```

You can find out more information about the custom Cypress commands used in this test [here](https://www.notion.so/RWA-Custom-Cypress-Commands-Tasks-Functions-5efc9089b2184a22910b5532796a65dd).

First, we visit the transaction screen for the specific transaction we looked up within the `beforeEach()` hook at the top of the spec file. Then we wait upon the `@getTransaction` intercept.

```jsx
cy.visit(`/transaction/${ctx.transactionRequest!.id}`);
    cy.wait("@getTransaction");

```

Next, we click on the "Reject Request" button and wait on the `@updateTransaction` intercept and confirm that this intercepts status code is `204`.

```jsx
cy.getBySelLike("reject-request").click();
    cy.wait("@updateTransaction").its("response.statusCode").should("equal", 204);

```

![Screen Shot 2021-09-16 at 9.24.53 AM.png](rejects%20a%20transaction%20request%204047f0467e8a466cb61be24a7442564c/Screen_Shot_2021-09-16_at_9.24.53_AM.png)

![Screen Shot 2021-09-16 at 9.25.17 AM.png](rejects%20a%20transaction%20request%204047f0467e8a466cb61be24a7442564c/Screen_Shot_2021-09-16_at_9.25.17_AM.png)

Finally, we make sure the reject request button is no longer in the `DOM` and that the transaction detail header is visible.

```jsx
cy.getBySelLike("reject-request").should("not.exist");
    cy.getBySel("transaction-detail-header").should("be.visible");

```

![Screen Shot 2021-09-16 at 9.25.33 AM.png](rejects%20a%20transaction%20request%204047f0467e8a466cb61be24a7442564c/Screen_Shot_2021-09-16_at_9.25.33_AM.png)