describe("klingon ipsum single page app test", () => {
  it("the user can generate a paragraph by inputting the number of words", () => {
    cy.clock();
    cy.visit("http://localhost:3000/");

    cy.intercept(
      "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
      (req) => {
        req.reply({
          statusCode: 200,
          fixture: "data.json",
          delay: 100,
          throttleKbps: 200,
        });
      }
    );

    cy.get('[data-testid="loading-spinner"]').should("exist");
    cy.get('[data-testid="loading-spinner"]').should("not.exist");
    cy.get('[data-testid="alert"]').should("have.text", "");

    // generate a paragraph containing 5 words
    cy.get('[data-testid="number-input"]').type(5);

    cy.get('[data-test-id="generate-button"]').click();

    cy.get('[data-testid="progress-bar"]').should("exist");
    cy.tick(100);

    cy.get('[data-testid="paragraph-component"]').should("have.length", 1);

    cy.get('[data-testid="alert"]')
      .contains(/success/i)
      .should("exist");

    cy.tick(3000);
    cy.get('[data-testid="alert"]').should("have.text", "");
    cy.clock().then((clock) => {
      clock.restore();
    });
    // end of generate a paragraph containing 5 words

    // generate 128 words, should create 1-6 paragraphs inclusive

    cy.get('[data-testid="number-input"]').clear();
    cy.get('[data-testid="number-input"]').type(128);
    cy.get('[data-test-id="generate-button"]').click();

    cy.get('[data-testid="progress-bar"]').should("exist");

    cy.get('[data-testid="paragraph-component"]').should(($paragraphs) => {
      const length = $paragraphs.length;
      expect(length).to.be.gte(1).and.be.lte(6);
    });

    cy.get('[data-testid="alert"]')
      .contains(/success/i)
      .should("exist");

    cy.get('[data-testid="alert"]').should("have.text", "");
  });
});
