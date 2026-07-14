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

  it('não deve autenticar com credenciais inválidas e deve exibir a mensagem de erro', () => {
    // Dado que o usuário está na tela de login
    cy.visit('/login')
 
    // Quando ele tenta autenticar com um usuario ou senha incorreta
    cy.get('[data-testid="email"]').type('usuario.inexistente@qa.com')
    cy.get('[data-testid="senha"]').type('senha-incorreta')
    cy.get('[data-testid="entrar"]').click()
 
    // Então a API deve rejeitar o login e a mensagem de erro deve aparecer na tela
    cy.contains(/email e\/ou senha inválidos/i).should('be.visible')
    cy.location('pathname').should('eq', '/login')
  })
})
