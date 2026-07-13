import { buildUsuario, buildProduto } from '../../support/helpers/dataBuilder'

describe('Produtos (administrador)', () => {
  it('deve permitir que um administrador cadastre um novo produto com sucesso', () => {
    // Dado um usuário administrador autenticado
    const admin = buildUsuario({ administrador: 'true' })
    cy.apiCriarUsuario(admin)
    cy.loginViaApi(admin)

    // Quando o administrador cadastra um novo produto com dados válidos
    const produto = buildProduto()
    cy.cadastrarProduto(produto)

    // Então o produto deve ser cadastrado com sucesso e aparecer na listagem
    cy.location('pathname', { timeout: 10000 }).should('eq', '/admin/listarprodutos')
    cy.contains('table tbody tr', produto.nome).should('be.visible')
  })
})

