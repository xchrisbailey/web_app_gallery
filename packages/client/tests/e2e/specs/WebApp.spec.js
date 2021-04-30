/// <reference types="cypress" />

beforeEach(() => {
  cy.intercept(
    {
      method: "GET",
      url: "/api/webapp/000000000000000000000000"
    },
    { fixture: "api/apps/skycrypt.json" }
  );
  cy.visit("/apps/000000000000000000000000");
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

  it("warns iOS compatibility", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/webapp/000000000000000000000001"
      },
      { fixture: "api/apps/youtube.json" }
    );
    cy.visit("/apps/000000000000000000000001");
    Cypress.on("window:before:load", win => {
      Object.defineProperty(win.navigator, "platform", { get: () => "iPhone" });
    });
    cy.contains("This app may not work on your device");
  });
});
