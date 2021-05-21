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

describe("Search bar", () => {
  it("searches", () => {
    cy.get(".v-input.search")
      .click()
      .type("test search{enter}");
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/");
      expect(loc.search).to.eq("?search=test%20search");
    });
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

  it("links to submit app", () => {
    cy.get(".v-navigation-drawer")
      .contains("a", "Submit New App")
      .should("have.attr", "href", "/apps/submit");
  });

  it("links to about page", () => {
    cy.get(".v-navigation-drawer")
      .contains("a", "About")
      .should("have.attr", "href", "/about");
  });

  it("links to profile", () => {
    cy.get(".v-navigation-drawer")
      .contains("a", "My Account")
      .should("have.attr", "href", "/profile");
  });

  it("is visible only after opening on small screens", () => {
    cy.viewport(320, 480);
    cy.get(".v-navigation-drawer").should("not.be.visible");
    cy.get("button.v-app-bar__nav-icon").click();
    cy.get(".v-navigation-drawer").should("be.visible");
  });

  it("is hidden only after closing on large screens", () => {
    cy.viewport(1400, 800);
    cy.get(".v-navigation-drawer").should("be.visible");
    cy.get("button.v-app-bar__nav-icon").click();
    cy.get(".v-navigation-drawer").should("not.be.visible");
  });
});
