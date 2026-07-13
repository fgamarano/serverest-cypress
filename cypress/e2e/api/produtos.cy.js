import { buildUsuario, buildProduto } from '../../support/helpers/dataBuilder'

describe('API - Cadastro de produtos', () => {
  it('deve permitir que um administrador cadastre um produto com sucesso', () => {
    const admin = buildUsuario({ administrador: 'true' })

    // Dado um usuário administrador autenticado
    cy.apiCriarUsuario(admin).then(() => {
      cy.request('POST', `${Cypress.env('apiBaseUrl')}/login`, {
        email: admin.email,
        password: admin.password
      }).then((loginResponse) => {
        const produto = buildProduto()

        // Quando o administrador cadastra um produto, enviando o token no header
        cy.request({
          method: 'POST',
          url: `${Cypress.env('apiBaseUrl')}/produtos`,
          headers: { Authorization: loginResponse.body.authorization },
          body: produto
        }).then((response) => {
          // Então o produto deve ser criado com sucesso
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
          expect(response.body).to.have.property('_id')
        })
      })
    })
  })
})
