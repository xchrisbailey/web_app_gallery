/// <reference types="cypress" />

beforeEach(() => {
  cy.intercept(
    {
      method: "GET",
      url: "/api/webapp/skycrypt"
    },
    { fixture: "api/apps/skycrypt.json" }
  );
  cy.visit("/apps/skycrypt");
});

describe("App Details", () => {
  it("has a name", () => {
    cy.contains(".text-h4", "SkyCrypt");
  });

  it("chooses the correct icon", () => {
    cy.get(".icon > img").should("have.attr", "src", "https://sky.shiiyu.moe/resources/img/app-icons/maskable-svg.svg");
  });

  it("links to start url", () => {
    cy.contains("a", "Open").should("have.attr", "href", "https://sky.shiiyu.moe/");
  });

  it("has a description", () => {
    cy.contains("A beautiful site for sharing your SkyBlock profile 🌹");
  });
});
