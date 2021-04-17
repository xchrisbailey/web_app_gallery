/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("/");
});

describe("App bar", () => {
  it("has a link to home page called Web App Gallery", () => {
    cy.contains("a", "Web App Gallery")
      .should("have.attr", "href")
      .and("equal", "/");
  });
});

describe("Side nav", () => {
  it("links to catagories", () => {
    cy.get(".v-navigation-drawer")
      .contains("a", "Games")
      .should("have.attr", "href", "/categories/games");
    cy.get(".v-navigation-drawer")
      .contains("a", "Social")
      .should("have.attr", "href", "/categories/social");
    cy.get(".v-navigation-drawer")
      .contains("a", "Utilities")
      .should("have.attr", "href", "/categories/utilities");
  });

  it("is hidden by default", () => {
    cy.get(".v-navigation-drawer").should("not.be.visible");
  });

  it("is visible after opening", () => {
    cy.get("button.v-app-bar__nav-icon").click();
    cy.get(".v-navigation-drawer").should("be.visible");
  });
});
