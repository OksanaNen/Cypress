import { faker } from "@faker-js/faker";
import { LoginPage } from '../pages/loginPage.js';

 describe("Secret Santa - API", () => {
  let oldPassword = "_gqd2m69";
  const loginPage = new LoginPage();

  it('Login', () => {
    
      cy.request({
        method: "POST",
        headers: { 
          Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjg5OTk2Mjk5fQ.s8798J-2NfyF1qvzNjR48u7nStrj_aAYEiZt26yHrz0; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjkyNTg4Mjk5fQ.vqhBFxYf6_Z2NxfOAUy4etrphOt_H8DCGg4nw082JnQ"
        },
        url: "https://santa-secret.ru/api/login?redirect=%2F",
        body: {
          email: "deminaon@gmail.com",
          password: oldPassword
      }
      }).then ((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.email).to.equal("deminaon@gmail.com");
        expect(response.body.username).to.equal("Oksana");
     });
  });

  it('Create a box (empty name and key)', () => {

    cy.LoginToSecretSanta();
   
    cy.request({
      failOnStatusCode: false,
      method: "POST",
      headers: { 
        Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjg5OTk2Mjk5fQ.s8798J-2NfyF1qvzNjR48u7nStrj_aAYEiZt26yHrz0; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjkyNTg4Mjk5fQ.vqhBFxYf6_Z2NxfOAUy4etrphOt_H8DCGg4nw082JnQ"
      },
      url: "https://santa-secret.ru/api/box",
      body: {
        email: null,
        name: "",
        key: "",
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
        expect(response.status).to.equal(400);
        expect(response.body.error.message).to.equal("validations.invalid");
        expect(response.body.error.errors[0].transKey).to.equal("validations.required");
     });
  });

  it('Create a new box', () => {
    
  let newName = faker.word.noun();
  let newKey = faker.word.noun();

      cy.LoginToSecretSanta();
      cy.CreateNewBox(newName, newKey);
  });

  it('Create a box with same name and key', () => {
    let newName = faker.word.noun();
    let newKey = faker.word.noun();

    cy.LoginToSecretSanta().then(() => {
      cy.CreateNewBox(newName, newKey).then(() => {
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
           expect(response.status).to.equal(200);

        });
      });
    });
  });

  it('Edit a box', () => {

    let newName = faker.word.noun();
    let newKey = faker.word.noun();
    let modifName = faker.word.noun();

    cy.LoginToSecretSanta();
    cy.CreateNewBox(newName, newKey);
      
    cy.request({
      method: "PUT",
      headers: { 
        Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjg5OTk2Mjk5fQ.s8798J-2NfyF1qvzNjR48u7nStrj_aAYEiZt26yHrz0; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjkyNTg4Mjk5fQ.vqhBFxYf6_Z2NxfOAUy4etrphOt_H8DCGg4nw082JnQ"
      },
      url: "https://santa-secret.ru/api/box",
      body: {
        email: null,
        name: modifName,
        key: newKey,
        picture: "cup_cake",
        usePost: true,
        useCashLimit: true,
        cashLimit: 2000,
        cashLimitCurrency: "rub",
        useWish: true,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: true,
        useNames: true,
        isPhoneRequired: true,
        logo: null
      }
    }).then ((response) => {
       expect(response.status).to.equal(200);
      });
  });
  
  it('Delete a box', () => {
    let newName = faker.word.noun();
    let newKey = faker.word.noun();

    cy.LoginToSecretSanta().then(() => {
      cy.CreateNewBox(newName, newKey).then(() => {
        cy.request({
          method: "DELETE",
          headers: { 
          Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjg5OTk2Mjk5fQ.s8798J-2NfyF1qvzNjR48u7nStrj_aAYEiZt26yHrz0; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjkyNTg4Mjk5fQ.vqhBFxYf6_Z2NxfOAUy4etrphOt_H8DCGg4nw082JnQ"
          },
          url: `https://santa-secret.ru/api/box/${newKey}`            
          }).then ((response) => {
            expect(response.status).to.equal(200);
        });
      });
    });
  });
});