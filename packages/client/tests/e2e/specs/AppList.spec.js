/// <reference types="cypress" />

describe("App List", () => {
  it("lists apps from api", () => {
    cy.intercept(
      {
        method: "GET",
        pathname: "/api/webapp",
        query: {
          page: "1"
        }
      },
      { fixture: "api/apps-p1.json" }
    );
    cy.visit("/");
    cy.contains("PROXX");
    cy.contains("Connexagon");
    cy.contains("Pinterest");
  });

  it("loads more", () => {
    cy.intercept(
      {
        method: "GET",
        pathname: "/api/webapp",
        query: {
          page: "1"
        }
      },
      { fixture: "api/apps-p1.json" }
    );
    cy.intercept(
      {
        method: "GET",
        pathname: "/api/webapp",
        query: {
          page: "2"
        }
      },
      { fixture: "api/apps-p2.json" }
    );
    cy.visit("/");
    cy.contains("Pinterest");
    cy.contains("Twitter").should("not.exist");
    cy.contains("button", "load more").click();
    cy.contains("Pinterest");
    cy.contains("Twitter");
  });

  it("filters by category", () => {
    cy.intercept({
      method: "GET",
      pathname: "/api/webapp",
      query: {
        category: "games"
      }
    }).as("requestGames");
    cy.visit("/categories/games");
    cy.wait("@requestGames").should("exist");
  });
});
