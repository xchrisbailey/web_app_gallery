/// <reference types="cypress" />

describe("404 Page", () => {
  it("says Page not found", () => {
    cy.visit("/this-is-not-a-real-url-so-it-will-404");
    cy.contains("Page not found");
  });
});
