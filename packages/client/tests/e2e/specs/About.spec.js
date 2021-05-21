/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("/about");
});

describe("about page", () => {
  it("links to GitHub", () => {
    cy.contains("a", "GitHub").should("have.attr", "href", "https://github.com/the-HTML-5/web_app_gallery");
  });
});
