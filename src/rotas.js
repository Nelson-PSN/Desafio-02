const { Router } = require('express');
const contasBancarias = require('./controladores/contaBancaria');
const { validarSenha, camposInformados, cpfEmailJaCadastrados, senhasContas } = require('./intermediarios/validadores');
const transacoes = require('./controladores/transacoes');

const rotas = Router();

rotas.get('/contas', validarSenha, contasBancarias.listarContasBancarias);
rotas.post('/contas', camposInformados, cpfEmailJaCadastrados, contasBancarias.criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', cpfEmailJaCadastrados, contasBancarias.atualizarConta);
rotas.delete('/contas/:numeroConta', contasBancarias.deletarConta);
rotas.post('/transacoes/depositar', transacoes.depositar);
rotas.post('/transacoes/sacar', senhasContas, transacoes.sacar);
rotas.post('/transacoes/transferir', senhasContas, transacoes.transferir);
rotas.get('/contas/saldo', senhasContas, contasBancarias.saldoDaConta);
rotas.get('/contas/extrato', senhasContas, contasBancarias.extratoConta);

module.exports = rotas;
