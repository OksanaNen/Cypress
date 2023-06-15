/// <reference types="cypress" />

describe('Checking links on the user page after login', () => {
  const baseUrl = Cypress.config('baseUrl');

  beforeEach('Login', () => {
    cy.visit('/login');
    cy.get(':nth-child(3) > .frm').type('deminaon@gmail.com{enter}');
    cy.get(':nth-child(4) > .frm').type('qwerty123{enter}');
    cy.get('.btn-main').click();
  });
  
  it('Check link - Boxes', () => {
    cy.clickButton('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"]');
    cy.checkUrl(`${baseUrl}/account/boxes`);
    cy.checkVisible('.toggle-menu-item--active > .txt--med');
   });

  it('Check link - Create box', () => {
    cy.clickButton('.home-page-buttons > [href="/box/new"] > .btn-main');
    cy.checkUrl(`${baseUrl}/box/new`);
    cy.checkVisible('.form-card__header > .txt-h3--semi');
  });

  it('Check link - Quick draw', () => {
    cy.clickButton('[href="/randomizer"] > .btn-secondary');
    cy.checkUrl(`${baseUrl}/randomizer`);
    cy.checkVisible('.tip');
  });
  
  it('Check link - Account', () => {
    cy.clickButton('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"]');
    cy.checkUrl(`${baseUrl}/account`);
    cy.checkVisible('#account_profile_settings');
  });  
})