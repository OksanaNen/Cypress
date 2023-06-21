import { faker } from "@faker-js/faker";
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json")


describe('Change Password', () => {
  it('User cannot login with old password', () =>{
    
    let oldPassword = "qwerty123";
    let newPassword = faker.internet.password(8); // 8 characters
    cy.log(newPassword)
 
    cy.visit('/');
    cy.clickButton('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med');
    cy.get(loginPageElements.loginField).type("deminaon@gmail.com");
    cy.get(loginPageElements.passwordField).type(oldPassword);
    cy.get(loginPageElements.loginButton).click();
    cy.shouldExist("Коробки");
    cy.changePassword(newPassword);
    cy.contains("Выйти с сайта").click();

    cy.visit('/');
    cy.clickButton('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med');
    cy.get(loginPageElements.loginField).type("deminaon@gmail.com");
    cy.get(loginPageElements.passwordField).type(oldPassword);
    cy.get(loginPageElements.loginButton).click();
    cy.shouldExist("Неверное имя пользователя или пароль");

    cy.get(loginPageElements.passwordField).clear().type(newPassword);
    cy.clickButton('.btn-main');

    cy.changePassword(oldPassword);
  });
});