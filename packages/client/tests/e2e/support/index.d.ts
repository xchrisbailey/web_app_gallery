/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to intercept /api/me and make vue think the user is logged in.
     * @example cy.interceptLogin()
     */
    interceptLogin(): Chainable;
  }
}
