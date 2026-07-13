import { buildUsuario } from '../../support/helpers/dataBuilder'

describe('API - Autenticação', () => {
  it('deve autenticar com sucesso e retornar um token de autorização válido', () => {
    const usuario = buildUsuario()

    // Dado um usuário previamente cadastrado
    cy.apiCriarUsuario(usuario).then(() => {
      // Quando ele realiza login com credenciais válidas
      cy.request('POST', `${Cypress.env('apiBaseUrl')}/login`, {
        email: usuario.email,
        password: usuario.password
      }).then((response) => {
        // Então a API deve confirmar o login e retornar um token no formato esperado
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Login realizado com sucesso')
        expect(response.body.authorization).to.match(/^Bearer\s.+/)
      })
    })
  })
})
