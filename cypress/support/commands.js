import { buildUsuario } from './helpers/dataBuilder'

const apiBaseUrl = () => Cypress.env('apiBaseUrl')

Cypress.Commands.add('apiCriarUsuario', (usuario = buildUsuario()) => {
  return cy
    .request('POST', `${apiBaseUrl()}/usuarios`, usuario)
    .then((response) => {
      expect(response.status).to.eq(201)
      return { ...usuario, _id: response.body._id }
    })
})

Cypress.Commands.add('login', (email, password) => {
  cy.session(email, () => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').clear()
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="senha"]').clear()
    cy.get('[data-testid="senha"]').type(password)
    cy.get('[data-testid="entrar"]').click()
    cy.location('pathname', { timeout: 10000 }).should('match', /\/(home|admin)/)
  })
})

Cypress.Commands.add('loginViaApi', (usuario) => {
  return cy.request('POST', `${apiBaseUrl()}/login`, {
    email: usuario.email,
    password: usuario.password
  }).then((response) => {
    cy.visit('/login')
    cy.window().then((win) => {
      win.localStorage.setItem('serverest/userEmail', usuario.email)
      win.localStorage.setItem('serverest/userToken', response.body.authorization)
      if (usuario.administrador === 'true') {
        win.localStorage.setItem('serverest/userNome', usuario.nome)
      }
    })
  })
})

Cypress.Commands.add('cadastrarProduto', (produto) => {
  cy.visit('/admin/cadastrarprodutos')
  cy.get('[data-testid="nome"]').type(produto.nome)
  cy.get('[data-testid="preco"]').type(String(produto.preco))
  cy.get('[data-testid="descricao"]').type(produto.descricao)
  cy.get('[data-testid="quantity"]').type(String(produto.quantidade))
  cy.get('[data-testid="cadastarProdutos"]').click()
})
