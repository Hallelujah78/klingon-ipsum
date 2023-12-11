describe("klingon ipsum single page app test", () => {
  it("renders all the required elements", () => {
    cy.visit("http://localhost:3000/");
    cy.intercept(
      "GET",
      "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
      {
        fixture: "data.json",
      }
    );

    cy.get('[data-testid="loading-spinner"]'); // existence is implied in this
  });
});
