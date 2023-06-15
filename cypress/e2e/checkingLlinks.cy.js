/// <reference types="cypress" />

// Добавьте второй спек с тестами: проверяем ссылки на странице пользователя после логина

// - коробки
// - создать коробку
// - быстрая жеребьевка
// - личный кабинет

// У вас должно быть 4 теста с проверками элементов на странице после перехода по ссылке, а также проверкой URL.

// Обязательно используйте baseUrl в конфигурации (стейджинговое окружение).

describe('Checking links on the user page after login', () => {
  const baseUrl = Cypress.config('baseUrl');

  beforeEach('Login', () => {
    cy.visit('/login');
    cy.get(':nth-child(3) > .frm').type('deminaon@gmail.com{enter}');
    cy.get(':nth-child(4) > .frm').type('qwerty123{enter}');
    cy.get('.btn-main').click();
  });
  
  it('Check link - Boxes', () => {
    cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"]')
      .click();
    cy.url().should('be.equal',`${baseUrl}/account/boxes`); 
    cy.get('.toggle-menu-item--active > .txt--med').should('be.visible');  
  });

  it('Check link - Create box', () => {
    cy.get('.home-page-buttons > [href="/box/new"] > .btn-main').click();
    cy.url().should('be.equal',`${baseUrl}/box/new`);
    cy.get('.form-card__header > .txt-h3--semi').should('be.visible');
  });

  it('Check link - Quick draw', () => {
    cy.get('[href="/randomizer"] > .btn-secondary').click();
    cy.url().should('be.equal',`${baseUrl}/randomizer`);
    cy.get('.tip').should('be.visible');
  });
  
  it('Check link - Account', () => {
    cy.clickButton('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"]');
    cy.url().should('be.equal',`${baseUrl}/account`);
    cy.get('#account_profile_settings').should('be.visible');
  });  
})