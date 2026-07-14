import { buildUsuario } from '../../support/helpers/dataBuilder'

describe('Cadastro de usuário', () => {
  it('deve cadastrar um novo usuário com sucesso pela interface', () => {
    const usuario = buildUsuario()

    cy.intercept('POST', '**/usuarios').as('cadastrarUsuario')

    // Dado que o usuário acessa a tela de cadastro
    cy.visit('/cadastrarusuarios')

    // Quando ele preenche o formulário com dados válidos e confirma o cadastro
    cy.get('[data-testid="nome"]').type(usuario.nome)
    cy.get('[data-testid="email"]').type(usuario.email)
    cy.get('[data-testid="password"]').type(usuario.password)
    cy.get('[data-testid="cadastrar"]').click()

    // Então devo receber exatamente os dados preenchidos no formulário
    cy.wait('@cadastrarUsuario').its('request.body').should('deep.include', {
      nome: usuario.nome,
      email: usuario.email,
      password: usuario.password
    })

    cy.contains(/cadastro realizado com sucesso/i).should('be.visible')
    cy.location('pathname', { timeout: 10000 }).should('eq', '/home')
  })
})