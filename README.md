# ServeRest - Testes Automatizados (Cypress)

[![Cypress Tests](https://github.com/fgamarano/serverest-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/fgamarano/serverest-cypress/actions/workflows/cypress.yml)

Suíte de testes automatizados (E2E + API) para a aplicação ServeRest, cobrindo os
fluxos mais críticos do frontend ([front.serverest.dev](https://front.serverest.dev))
e da API ([serverest.dev](https://serverest.dev)).

## Estrutura

```
cypress/
├── e2e/
│   ├── frontend/
│   │   ├── login.cy.js
│   │   ├── usuarios.cy.js
│   │   └── produtos.cy.js
│   └── api/
│       ├── login.cy.js
│       ├── usuarios.cy.js
│       └── produtos.cy.js
├── support/
│   ├── commands.js
│   ├── e2e.js
│   └── helpers/
│       └── dataBuilder.js
cypress.config.js
```

## Cenários cobertos

### Frontend (E2E)

- **Login**: com sucesso e com credenciais inválidas (mensagem de erro da API).
- **Cadastro de usuário**: sucesso, com validação do payload enviado à API via
  `cy.intercept`.
- **Cadastro de produto (admin)**: sucesso e tratamento de erro de servidor
  (simulado via `cy.intercept`).

### API

- **Login**: autenticação com sucesso e retorno de token válido.
- **Usuários**: cadastro com sucesso e regra de negócio de e-mail duplicado.
- **Produtos**: cadastro com sucesso (rota autenticada).

## Decisões técnicas

- Massa de dados gerada dinamicamente a cada execução (`dataBuilder.js`), evitando
  conflitos de dados em uma API pública e compartilhada.
- Setup determinístico via API (`cy.apiCriarUsuario`, `cy.loginViaApi`), reservando a
  UI para o fluxo que é, de fato, objeto do teste.
- Seletores por `data-testid`, confirmados no código-fonte da aplicação — mais
  resilientes a mudanças de texto ou estilo.
- `cy.session` para reaproveitar sessões autenticadas entre testes.
- `cy.intercept` com dois usos distintos: aguardar chamadas reais de forma
  determinística e validar contratos (UI → API), e simular respostas de erro que
  seriam difíceis de reproduzir de forma confiável contra a API real.

## CI

`.github/workflows/cypress.yml` roda os testes de frontend e de API automaticamente
em todo push/PR para `main`.

## Qualidade

- ESLint (`eslint-plugin-cypress`) e Prettier configurados (`npm run lint`,
  `npm run format`).
- `.gitignore` para não versionar `node_modules` e artefatos do Cypress.

## Como executar

```bash
npm install
npx cypress open        # modo interativo
npx cypress run         # modo headless
npm run cy:run:frontend # apenas os testes de UI
npm run cy:run:api      # apenas os testes de API
```