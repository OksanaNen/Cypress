import { faker } from "@faker-js/faker";
import { LoginPage } from '../pages/loginPage.js';
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json")


describe('Change Password', () => {
  it('User cannot login with old password', () =>{
    
    const loginPage = new LoginPage();
    let oldPassword = "qwerty123";
    let newPassword = faker.internet.password(8); // 8 characters
    cy.log(newPassword)
 
    cy.visit('/');
    cy.clickButton('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med');
    loginPage.login("deminaon@gmail.com", oldPassword);
    cy.contains("Коробки").should("exist");
    cy.changePassword(newPassword);
    cy.contains("Выйти с сайта").click();

    cy.visit('/');
    cy.clickButton('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med');
    loginPage.login("deminaon@gmail.com", oldPassword);
    cy.contains("Неверное имя пользователя или пароль").should("exist");

    cy.get(':nth-child(4) > .frm').clear().type(newPassword);
    cy.get('.btn-main').click();

    cy.changePassword(oldPassword);
  });
});