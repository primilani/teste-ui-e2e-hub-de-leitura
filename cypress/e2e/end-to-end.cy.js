/// <reference types="cypress"/>
import { faker, Faker } from "@faker-js/faker";
import cadastroPage from "../support/pages/cadastro-page";

describe('Testes End To End do fluxo de cadastro e login', () => {

    /* 
    Testes End To End ou Testes de ponta a ponta, ligam uma série de funcionalidades de um sistema,
    simulando o comportamento do usuário final. Esses testes verificam se diferentes partes do sistema
    funcionam corretamente quando integradas, garantindo que o fluxo completo de uma funcionalidade
    funcione como esperado.
    Aqui iremos criar um teste end to end que cobre o fluxo de cadastro e login de um usuário em um sistema web.
    Em apenas um teste, ou seja, em um único "it", iremos:
    1. Acessar a página de cadastro.
    2. Preencher o formulário de cadastro com dados válidos.
    3. Submeter o formulário e verificar se o cadastro foi bem-sucedido.
    4. Acessar a página de login.
    5. Preencher o formulário de login com as credenciais do usuário recém-cadastrado.
    6. Submeter o formulário de login e verificar se o login foi bem-sucedido.

    Use as boas práticas aprendidas até agora para estruturar o teste.
    */

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', () => {
        // Criando um novo usuário
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('51999990067')
        cy.get('#password').type('Senha@123')
        cy.get('#confirm-password').type('Senha@123')
        cy.get('#terms-agreement').check() // Tambem da certo com 'Click'
        cy.get('#register-btn').click()
        // Rsultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)

        //Acessar pagina de login
        cy.get('.btn-outline-danger > .fas').click()

        //Preencher fomulario de login = email: Jordyn.Roob@gmail.com / senha: Senha@123
        cy.get('#email').type('Jordyn.Roob@gmail.com')
        cy.get('#password').type('Senha@123')
        cy.get('#login-btn').click()
        cy.get('#user-name').should('contain', 'Roberta Wilderman')
    });
});