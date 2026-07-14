
const unique = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`

export const buildUsuario = (overrides = {}) => {
  const id = unique()

  return {
    nome: `Usuario Teste ${id}`,
    email: `usuario.teste.${id}@qa.com`,
    password: 'Senha@123',
    administrador: 'false',
    ...overrides
  }
}

export const buildProduto = (overrides = {}) => {
  const id = unique()

  return {
    nome: `Produto Teste ${id}`,
    preco: 100,
    descricao: 'Produto criado por automação de testes',
    quantidade: 10,
    ...overrides
  }
}
