/// <reference types="cypress" />

describe( 'The element on the page loaded', () => {
  beforeEach(() => {
    cy.visit('https://secret-santa.ru/')
  })
  
  it('The title h3', () => {
    cy.get('h3.title')
      .should('be.visible')
  })
})