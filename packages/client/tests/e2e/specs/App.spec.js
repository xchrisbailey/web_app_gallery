// https://docs.cypress.io/api/introduction/api.html

describe("App bar", () => {
  it("has a link to home page called Web App Gallery", () => {
    cy.visit("/");
    cy.contains("a", "Web App Gallery")
      .should("have.attr", "href")
      .and("equal", "/");
  });
});
