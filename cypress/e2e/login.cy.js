const textData = require("../fixtures/loginData.json");

const selectors = {
  usernameInput: ':nth-child(3) > .frm',
  passwordInput: ':nth-child(4) > .frm',
  loginButton: '.btn-main',
  errorMessageLogin: '.frm-wrapper__top__error',
  errorMessagePassword: '.hint > .txt-secondary'
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Log in with valid credentials', () => {
    cy.email(selectors.usernameInput, textData[0].username);
    cy.password(selectors.passwordInput, textData[0].password);
    cy.clickButton(selectors.loginButton);
  });

  it('Display error message with invalid username', () => {
    cy.email(selectors.usernameInput, textData[1].username);
    cy.password(selectors.passwordInput, textData[1].password);
    cy.clickButton(selectors.loginButton);
    cy.checkVisible(selectors.errorMessageLogin);
  });

  it('Display error message with invalid password', () => {
    cy.email(selectors.usernameInput, textData[2].username);
    cy.password(selectors.passwordInput, textData[2].password);
    cy.clickButton(selectors.loginButton);
    cy.checkVisible(selectors.errorMessagePassword);
  });

  it('Display error message with empty login and password', () => {
    cy.get(selectors.loginButton).click();
    cy.checkVisible(selectors.errorMessagePassword);
    cy.checkVisible(selectors.errorMessageLogin);
  });
});


