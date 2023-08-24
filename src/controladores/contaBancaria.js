
const bancodedados = require('../bancodedados');
const { contaExistente } = require('../utils/utils');

const listarContasBancarias = (req, res) => {
    return res.status(200).json(bancodedados.contas);
}

const criarContaBancaria = (req, res) => {
    let ultimaConta = 1;

    if (bancodedados.contas.length > 0) {
        let ultimoIndice = bancodedados.contas.length - 1
        ultimaConta = Number(bancodedados.contas[ultimoIndice].numero) + 1
    }

    let contaCadastrada = {
        numero: ultimaConta,
        saldo: 0,
        usuario: {
            ...req.body
        }
    }

    bancodedados.contas.push(contaCadastrada);

    return res.status(201).json(contaCadastrada);

}

const atualizarConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    let contaEncontrada = contaExistente(numeroConta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta inixistente" });
    }

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: "Favor informar alguma informação para altereção" })
    }

    if (nome) {
        contaEncontrada.usuario.nome = nome;
    }

    if (cpf) {
        contaEncontrada.usuario.cpf = cpf;
    }
    if (data_nascimento) {
        contaEncontrada.usuario.data_nascimento = data_nascimento;
    }

    if (telefone) {
        contaEncontrada.usuario.telefone = telefone;
    }
    if (email) {
        contaEncontrada.usuario.email = email;
    }
    if (senha) {
        contaEncontrada.usuario.senha = senha;
    }

    return res.status(200).json({ mensagem: "Conta atualizada com sucesso!" });

}

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;

    let contaEncontrada = contaExistente(numeroConta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta inixistente" });
    }

    if (contaEncontrada.saldo > 0) {
        return res.status(400).json({ mensagem: "Conta precisa estar sem saldo para a exclusão da conta!" });
    }

    let contaFiltrada = bancodedados.contas.filter((conta) => {
        return Number(conta.numero) !== Number(numeroConta)
    })

    bancodedados.contas = contaFiltrada;

    return res.status(200).json({ mensagem: "Conta excluída com sucesso!" });

}

const saldoDaConta = (req, res) => {
    const { numero_conta } = req.query;

    const contaEncontrada = contaExistente(numero_conta);


    return res.status(200).json({ mensagem: `Saldo: ${contaEncontrada.saldo}` });
}

const extratoConta = (req, res) => {
    const { numero_conta } = req.query;

    let saques = bancodedados.saques.filter((usuario) => {
        return Number(usuario.numero_conta) === Number(numero_conta);
    })
    let depositos = bancodedados.depositos.filter((usuario) => {
        return Number(usuario.numero_conta) === Number(numero_conta);
    })
    let transferencias = bancodedados.transferencias.filter((usuario) => {
        return Number(usuario.numero_conta) === Number(numero_conta) || Number(usuario.numero_conta_destino) === Number(numero_conta);
    })



    return res.status(200).json({
        depositos: [
            depositos
        ],
        saques: [
            saques
        ],
        transferencias: [
            transferencias
        ]
    })
}

module.exports = {
    listarContasBancarias,
    criarContaBancaria,
    atualizarConta,
    deletarConta,
    saldoDaConta,
    extratoConta
}