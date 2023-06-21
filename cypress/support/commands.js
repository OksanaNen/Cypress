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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickButton', (selector) => {
  cy.get(selector).click();
})

Cypress.Commands.add('checkUrl', (urlCheck) => {
  cy.url().should('be.equal', urlCheck); 
})

Cypress.Commands.add('checkVisible', (select) => {
  cy.get(select).should('be.visible');
})

Cypress.Commands.add('username', (selector, userName) => {
  cy.get(selector).type(userName);
});

Cypress.Commands.add('email', (selector, eMail) => {
  cy.get(selector).type(eMail);
});

Cypress.Commands.add('password', (selector, passWord) => {
  cy.get(selector).type(passWord);
});

Cypress.Commands.add('changePassword', (newPassword) => {
  cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"]').click();
  cy.get('.layout-column-start > :nth-child(1) > .frm').type(newPassword);
  cy.get(':nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm').type(newPassword);
  cy.get('.layout-row-end > .btn-service').click();
});