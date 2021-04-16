/// <reference types="cypress" />

describe("App bar", () => {
  it("has a link to home page called Web App Gallery", () => {
    cy.visit("/");
    cy.contains("a", "Web App Gallery")
      .should("have.attr", "href")
      .and("equal", "/");
  });
});
