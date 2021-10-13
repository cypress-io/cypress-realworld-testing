# transactions navigation tabs are hidden on a transaction view page

Ready for Review: Yes
Section: Real World Examples, Transaction View
Status: Migrated
Title Approved: No

Before continuing, make sure you have read the [Transaction View Overview & Setup](Transaction%20View%20Overview%20&%20Setup%20de652b8e362149babd9b8a5a787d996e.md) lesson first.

```jsx
it("transactions navigation tabs are hidden on a transaction view page", function () {
    cy.getBySelLike("transaction-item").first().click();
    cy.location("pathname").should("include", "/transaction");
    cy.getBySel("nav-transaction-tabs").should("not.exist");
    cy.getBySel("transaction-detail-header").should("be.visible");
    cy.visualSnapshot("Transaction Navigation Tabs Hidden");
  });

```

You can find out more information about the custom Cypress commands used in this test [here](https://www.notion.so/RWA-Custom-Cypress-Commands-Tasks-Functions-5efc9089b2184a22910b5532796a65dd).

This is a relatively straightforward test in which we are making sure that the transaction navigation tabs are hidden on the transaction view page.

The first thing we do is click on the first transaction and confirm that the application routes us to that transactions page.

```jsx
cy.getBySelLike("transaction-item").first().click();
    cy.location("pathname").should("include", "/transaction");

```

![Screen Shot 2021-09-16 at 9.26.18 AM.png](transactions%20navigation%20tabs%20are%20hidden%20on%20a%20trans%20d9a7226f583b402db3c5389a0d513325/Screen_Shot_2021-09-16_at_9.26.18_AM.png)

Finally, we confirm that the transaction tabs are not in the `DOM` and that the transaction header is visible.

```jsx
cy.getBySel("nav-transaction-tabs").should("not.exist");
    cy.getBySel("transaction-detail-header").should("be.visible");

```

![Screen Shot 2021-09-16 at 9.26.40 AM.png](transactions%20navigation%20tabs%20are%20hidden%20on%20a%20trans%20d9a7226f583b402db3c5389a0d513325/Screen_Shot_2021-09-16_at_9.26.40_AM.png)