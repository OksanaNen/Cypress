const textData = require("../fixtures/registrationData.json");

const selectors = {
  usernameInput: ':nth-child(3) > .frm',
  emailInput: ':nth-child(4) > .frm',
  registerButton: '.btn-main',
  pictureNotice: '.picture-notice__title',
  errorMessage: '.form-auth__error > .hint > .txt-secondary',
  errorMessageEmail: ':nth-child(4) > .frm-wrapper__top > .frm-wrapper__top__error'
};

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('Register with valid data', () => {
    cy.username(selectors.usernameInput, textData[0].username);
    cy.email(selectors.emailInput, textData[0].email);
    cy.clickButton(selectors.registerButton);
    cy.checkVisible(selectors.pictureNotice);
  });

  it('Display error message - user already exists', () => {
    cy.username(selectors.usernameInput, textData[0].username);
    cy.get(selectors.emailInput).type(textData[0].email);
    cy.clickButton(selectors.registerButton);
    cy.checkVisible(selectors.errorMessage);
  });

  it('Display error message with empty name', () => {
    cy.get(selectors.emailInput).type(textData[1].email);
    cy.clickButton(selectors.registerButton);
    cy.checkVisible(selectors.errorMessage);
  });

  it('Display error message with empty email', () => {
    cy.username(selectors.usernameInput, textData[2].username);
    cy.clickButton(selectors.registerButton);
    cy.checkVisible(selectors.errorMessage);
  });

  it('Display error message with empty fields', () => {
    cy.clickButton(selectors.registerButton);
    cy.checkVisible(selectors.errorMessage);
  });

  it('Display error message with wrong email', () => {
    cy.username(selectors.usernameInput, textData[3].username);
    cy.get(selectors.emailInput).type(textData[3].email);
    cy.clickButton(selectors.registerButton);
    cy.checkVisible(selectors.errorMessageEmail);
  });

});