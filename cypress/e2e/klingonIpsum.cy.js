describe("klingon ipsum single page app test", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("http://localhost:3000/");
  });
  it("the user can generate a paragraph by inputting the number of words", () => {
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

  it("alerts the user when the input is incorrect", () => {
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
    // empty input
    cy.get('[data-testid="number-input"]').clear();
    cy.get('[data-test-id="generate-button"]').click();
    cy.get('[data-testid="alert"]').should("contain.text", "positive number");
    cy.tick(3000);
    cy.get('[data-testid="alert"]').should("contain.text", "");

    // 0 value
    cy.get('[data-testid="number-input"]').clear();
    cy.get('[data-testid="number-input"]').type(0);
    cy.get('[data-test-id="generate-button"]').click();
    cy.get('[data-testid="alert"]').should("contain.text", "positive number");
    cy.tick(3000);
    cy.get('[data-testid="alert"]').should("contain.text", "");

    // negative values
    cy.get('[data-testid="number-input"]').clear();
    cy.get('[data-testid="number-input"]').type(-10);
    cy.get('[data-test-id="generate-button"]').click();
    cy.get('[data-testid="alert"]').should("contain.text", "positive number");
    cy.tick(3000);
    cy.get('[data-testid="alert"]').should("contain.text", "");
  });

  // data request error state
  it("renders an error component when the data fetching fails/not found", () => {
    cy.intercept(
      "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
      (req) => {
        req.reply({
          statusCode: 404,
        });
      }
    );
    cy.get('[data-testid="error-message"]').should("exist");
    cy.get('[data-testid="refresh-button"]').should("exist");
  });

  it.only("renders JumpTop when the user scrolls down the page", () => {
    cy.intercept(
      "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
      (req) => {
        req.reply({
          statusCode: 200,
          fixture: "data.json",
          delay: 50,
          throttleKbps: 200,
        });
      }
    );
    cy.clock().then((clock) => {
      clock.restore();
    });

    cy.get('[data-test="jump-to-top-button"]').should("not.be.visible");
    cy.get('[data-testid="number-input"]').clear();
    cy.get('[data-testid="number-input"]').type(500);
    cy.get('[data-test-id="generate-button"]').click();

    cy.get('[data-testid="alert"]')
      .contains(/success/i)
      .should("exist");
    cy.scrollTo("0%", "40%");
    cy.get('[data-test="jump-to-top-button"]').should("not.be.visible");
    cy.scrollTo("bottom");

    cy.get('[data-test="jump-to-top-button"]').should("be.visible");
    cy.get('[data-test="jump-to-top-button"]').click();
    cy.get('[data-test="jump-to-top-button"]').should("not.be.visible");
  });
});
