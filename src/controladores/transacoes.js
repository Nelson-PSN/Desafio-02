const { contaExistente, dataFormatada } = require('../utils/utils');
const bancodedados = require('../bancodedados');


const depositar = (req, res) => {
    const { valor, numero_conta } = req.body;

    let contaEncontrada = contaExistente(numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta inixistente" });
    }
    if (!valor || !numero_conta) {
        return res.status(400).json({ mensagem: "Favor informar: Numero da conta e Valor." });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "Valor precisa ser maior de 0" });
    }

    contaEncontrada.saldo = Number(contaEncontrada.saldo) + Number(valor);

    const data = dataFormatada();

    bancodedados.depositos.push({
        data,
        numero_conta,
        valor
    })

    return res.status(200).json({ mensagem: "Depósito realizado com sucesso!" });

}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    let contaEncontrada = contaExistente(numero_conta);

    if (!valor || !numero_conta || !senha) {
        return res.status(400).json({ mensagem: "Favor informar: Numero da conta, Valor e senha." });
    }
    if (contaEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente" });
    }

    contaEncontrada.saldo = Number(contaEncontrada.saldo) - Number(valor);

    const data = dataFormatada();

    bancodedados.saques.push({
        data,
        numero_conta,
        valor
    })

    return res.status(200).json({ mensagem: "Saque realizado com sucesso!" });
}

const transferir = (req, res) => {
    const { numero_conta, numero_conta_destino, valor, senha } = req.body;

    let contaOrigemExistente = contaExistente(numero_conta);
    let contaDestinoExistente = contaExistente(numero_conta_destino);

    if (!numero_conta_destino || !numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: "Favor preencher todas as informaçoes: Conta Origem , Conta Destino , Valor e Senha da conta de Origem!" });
    }
    if (!contaDestinoExistente || !contaOrigemExistente) {
        return res.status(400).json({ mensagem: "Conta Origem ou Conta destino inexistente!" });
    }
    if (contaOrigemExistente.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente para transferencia" });
    }

    contaOrigemExistente.saldo = Number(contaOrigemExistente.saldo) - Number(valor);
    contaDestinoExistente.saldo = Number(contaDestinoExistente.saldo) + Number(valor);

    const data = dataFormatada();

    bancodedados.transferencias.push({
        data,
        numero_conta,
        numero_conta_destino,
        valor
    })

    return res.status(200).json({ mensagem: "Transferência realizada com sucesso!" });
}

module.exports = {
    depositar,
    sacar,
    transferir
}