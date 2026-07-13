import { buildUsuario } from '../../support/helpers/dataBuilder'

describe('Autenticação', () => {
  it('deve autenticar com sucesso e redirecionar o usuário para a home', () => {
    // Dado um usuário previamente cadastrado
    const usuario = buildUsuario()
    cy.apiCriarUsuario(usuario)

    // Quando o usuário realiza login pela interface com credenciais válidas
    cy.login(usuario.email, usuario.password)
    cy.visit('/home')

    // Então ele deve ser redirecionado para a home e visualizar a loja
    cy.location('pathname', { timeout: 10000 }).should('eq', '/home')
    cy.contains('Serverest Store').should('be.visible')
  })
})
