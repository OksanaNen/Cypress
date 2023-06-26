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

Cypress.Commands.add('shouldExist', (selector) => {
  cy.contains(selector).should("exist");
})

Cypress.Commands.add('requestChangePassword', (pass) => {
  cy.request({
    method: "PUT",
    headers: { 
      Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjg5OTk2Mjk5fQ.s8798J-2NfyF1qvzNjR48u7nStrj_aAYEiZt26yHrz0; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjkyNTg4Mjk5fQ.vqhBFxYf6_Z2NxfOAUy4etrphOt_H8DCGg4nw082JnQ"
    },
    url: "https://santa-secret.ru/api/account/password",
    body: {
      password: pass
    }
  }).then ((response) => {
    expect(response.status).to.equal(200);
  });
});


Cypress.Commands.add('LoginToSecretSanta', () => {
  cy.request({
    method: "POST",
    headers: { 
      Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjg5OTk2Mjk5fQ.s8798J-2NfyF1qvzNjR48u7nStrj_aAYEiZt26yHrz0; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjkyNTg4Mjk5fQ.vqhBFxYf6_Z2NxfOAUy4etrphOt_H8DCGg4nw082JnQ"
    },
    url: "https://santa-secret.ru/api/login?redirect=%2F",
    body: {
      email: "deminaon@gmail.com",
      password: "_gqd2m69"
   }
  }).then ((response) => {
    expect(response.status).to.equal(200);
 });
});


Cypress.Commands.add('CreateNewBox', (newName, newKey) => {
  cy.request({
    method: "POST",
    headers: { 
      Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjg5OTk2Mjk5fQ.s8798J-2NfyF1qvzNjR48u7nStrj_aAYEiZt26yHrz0; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjkyNTg4Mjk5fQ.vqhBFxYf6_Z2NxfOAUy4etrphOt_H8DCGg4nw082JnQ"
    },
    url: "https://santa-secret.ru/api/box",
    body: {
      email: null,
      name: newName,
      key: newKey,
      picture: "cookie_star",
      usePost: false,
      useCashLimit: null,
      cashLimit: null,
      cashLimitCurrency: null,
      useWish: false,
      useCircleDraw: null,
      isInviteAfterDraw: null,
      isArchived: null,
      createAdminCard: null,
      isCreated: true,
      useNames: false,
      isPhoneRequired: false,
      logo: null
  }
  }).then ((response) => {
    cy.log('Here');
    expect(response.status).to.equal(200);
    expect(response.body.box.name).to.equal(newName);
    expect(response.body.box.key).to.equal(newKey);
 });

})