// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

beforeEach(() => {
  cy.interceptLogin();
  cy.visit("/apps/submit");
});

function submitSkycrypt() {
  cy.contains(".v-input", "URL")
    .click()
    .type("https://proxx.app/");
  cy.contains(".v-input", "Category").click();
  cy.contains("games").click();
  cy.contains("button", "Submit").click();
}

describe("app submission page", () => {
  it("posts data", () => {
    cy.intercept({
      method: "POST",
      pathname: "/api/webapp"
    }).as("post");
    submitSkycrypt();
    cy.wait("@post").then(post => {
      expect(post.request.body)
        .to.have.property("appUrl")
        .equals("https://proxx.app/");
      expect(post.request.body)
        .to.have.property("category")
        .equals("games");
    });
  });

  it("navigates to app", () => {
    cy.intercept(
      {
        method: "POST",
        pathname: "/api/webapp"
      },
      { fixture: "api/apps/skycrypt.json" }
    );
    submitSkycrypt();
    cy.location("pathname").should("equal", "/apps/skycrypt");
  });

  it("displays error", () => {
    cy.intercept(
      {
        method: "POST",
        pathname: "/api/webapp"
      },
      { statusCode: 400, fixture: "api/genaricError.json" }
    );
    submitSkycrypt();
    cy.contains("this is an error for testing in cypress");
  });
});
