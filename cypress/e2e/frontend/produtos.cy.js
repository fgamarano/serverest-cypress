import { buildUsuario, buildProduto } from '../../support/helpers/dataBuilder'

describe('Produtos (administrador)', () => {
  it('deve permitir que um administrador cadastre um novo produto com sucesso', () => {
    // Dado um usuário administrador autenticado.
    const admin = buildUsuario({ administrador: 'true' })
    cy.apiCriarUsuario(admin)
    cy.loginViaApi(admin)

    cy.intercept('POST', '**/produtos').as('cadastrarProduto')

    // Quando o administrador cadastra um novo produto com dados válidos
    const produto = buildProduto()
    cy.cadastrarProduto(produto)

    // Então a API deve confirmar o cadastro...
    cy.wait('@cadastrarProduto').its('response.statusCode').should('eq', 201)

    // ...e o produto deve aparecer na listagem
    cy.location('pathname', { timeout: 10000 }).should('eq', '/admin/listarprodutos')
    cy.contains('table tbody tr', produto.nome).should('be.visible')
  })

  it('deve exibir uma mensagem de erro ao falhar o cadastro do produto', () => {
    const admin = buildUsuario({ administrador: 'true' })
    cy.apiCriarUsuario(admin)
    cy.loginViaApi(admin)

    cy.intercept('POST', '**/produtos', {
      statusCode: 500,
      body: { message: 'Erro interno do servidor' }
    }).as('cadastrarProdutoComErro')

    const produto = buildProduto()
    cy.cadastrarProduto(produto)

    cy.wait('@cadastrarProdutoComErro')
    cy.contains(/erro interno do servidor/i).should('be.visible')
    cy.location('pathname').should('eq', '/admin/cadastrarprodutos')
  })
})