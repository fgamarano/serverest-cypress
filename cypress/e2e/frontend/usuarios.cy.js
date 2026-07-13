import { buildUsuario } from '../../support/helpers/dataBuilder'

describe('Cadastro de usuário', () => {
  it('deve cadastrar um novo usuário com sucesso', () => {
    const usuario = buildUsuario()

    // Dado que o usuário acessa a tela de cadastro
    cy.visit('/cadastrarusuarios')

    // Quando ele preenche o formulário com dados válidos e confirma o cadastro
    cy.get('[data-testid="nome"]').type(usuario.nome)
    cy.get('[data-testid="email"]').type(usuario.email)
    cy.get('[data-testid="password"]').type(usuario.password)
    cy.get('[data-testid="cadastrar"]').click()

    // Então o cadastro deve ser confirmado e o usuário, já autenticado, redirecionado para a home
    cy.contains(/cadastro realizado com sucesso/i).should('be.visible')
    cy.location('pathname', { timeout: 10000 }).should('eq', '/home')
  })
})
