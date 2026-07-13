import { buildUsuario } from '../../support/helpers/dataBuilder'

describe('API - Usuários', () => {
  it('deve cadastrar um usuário com sucesso e retornar os dados do usuário criado', () => {
    const usuario = buildUsuario()

    cy.request('POST', `${Cypress.env('apiBaseUrl')}/usuarios`, usuario).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      expect(response.body).to.have.property('_id')
    })
  })

  it('não deve permitir cadastrar dois usuários com o mesmo email', () => {
    const usuario = buildUsuario()

    // Dado um usuário já cadastrado
    cy.apiCriarUsuario(usuario)

    // Quando tentamos cadastrar outro usuário utilizando o mesmo email
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/usuarios`,
      body: usuario,
      failOnStatusCode: false
    }).then((response) => {
      // Então a API deve rejeitar o cadastro, preservando a unicidade do email
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq('Este email já está sendo usado')
    })
  })
})
