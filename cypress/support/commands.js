// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add("login", () => {
//   const auth = Cypress.env("apiAuthenticationURL") + "/signin";
//   cy.request({
//     method: "POST",
//     url: auth,
//     body: {
//       username: atob(Cypress.env("username")),
//       password: atob(Cypress.env("password")),
//     },
//   })
//     .its("body")
//     .then((body) => {
//       cy.setLocalStorage("user", "demo");
//       cy.setLocalStorage("user_token", body.accessToken);
//       cy.setLocalStorage("user_refresh_token", body.refreshToken);
//     });
// });
