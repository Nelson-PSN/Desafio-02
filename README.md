# :bank:  API de Banco Digital em JavaScript

Esta API de Banco Digital, desenvolvida em JavaScript! Esta API fornece os recursos essenciais para gerenciar contas bancárias e realizar transações em um ambiente de banco digital. Veja abaixo os detalhes dos endpoints disponíveis:

## Sobre o Projeto

Este projeto é uma API de Banco Digital construída usando JavaScript e Node.js. O objetivo principal é oferecer funcionalidades completas para contas bancárias em um ambiente virtual, incluindo operações como criação, atualização, depósito, saque, transferências, consulta de saldo, emissão de extratos e exclusão de contas.

## :computer: Endpoints

### 1. `GET /contas`

Retorna uma lista de contas bancárias cadastradas.
Esse end point recebe espera receber a senha no params da requisição

### 2. `POST /contas`

Cria uma nova conta bancária. Envie os detalhes necessários no corpo da solicitação.

### 3. `PUT /contas/:numeroConta/usuario`

Atualiza os dados de um usuário de uma conta bancária específica com base no ID fornecido. Os novos dados devem ser enviados no corpo da solicitação.

### 4. `POST /transacoes/depositar`

Realiza um depósito em uma conta bancária específica com base no ID fornecido. O valor do depósito deve ser enviado no corpo da solicitação.

### 5. `POST /transacoes/sacar`

Realiza um saque de uma conta bancária específica com base no ID fornecido. O valor do saque deve ser enviado no corpo da solicitação.

### 6. `POST /transacoes/transferir`

Realiza uma transferência de valores entre contas bancárias. Envie os detalhes da transferência no corpo da solicitação.

### 7. `GET /contas/saldo?numero_conta=""&senha=""`

Consulta o saldo de uma conta bancária específica com base no ID fornecido.

### 8. `GET /contas/extrato?numero_conta=""&senha=""`

Emite um extrato bancário para uma conta bancária específica com base no ID fornecido.

### 9. `DELETE /contas/:numeroConta`

Exclui uma conta bancária específica com base no ID fornecido.

## Como Usar

1. Certifique-se de ter o Node.js instalado.
2. Clone este repositório.
3. Execute `npm install` para instalar as dependências.
4. Configure as variáveis de ambiente, se necessário.
5. Execute `npm run dev` para iniciar o servidor.

