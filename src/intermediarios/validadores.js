const bancodedados = require('../bancodedados');
const { contaExistente } = require('../utils/utils');

const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;
    const senha = bancodedados.banco.senha;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: "Favor inserir a senha" });
    }

    if (senha_banco !== senha) {
        return res.status(400).json({ mensagem: "Senha incorreta" });
    }

    next()
}

const camposInformados = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatorios" });
    }
    next()
}

const cpfEmailJaCadastrados = (req, res, next) => {
    const { cpf, email } = req.body
    const cpfExistente = bancodedados.contas.find((usuario) => {
        return Number(usuario.usuario.cpf) === Number(cpf)
    })

    const emailExistente = bancodedados.contas.find((usuario) => {
        return usuario.usuario.email === email
    })

    if (cpfExistente) {
        return res.status(400).json({ mensagem: "O cpf informado já esta cadastrado!" });
    }

    if (emailExistente) {
        return res.status(400).json({ mensagem: "O e-mail informado já esta cadastrado" });
    }

    next()
}

const senhasContas = (req, res, next) => {
    const query = req.query;
    const body = req.body;
    let contaEncontrada;

    if (query.numero_conta) {
        contaEncontrada = contaExistente(query.numero_conta);
    }
    if (body.numero_conta) {
        contaEncontrada = contaExistente(body.numero_conta);
    }

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta inixistente" });
    }

    if (!query.senha && !body.senha) {
        return res.status(400).json({ mensagem: "Favor inserir a senha" });
    }

    if (query.numero_conta) {
        if (contaEncontrada.usuario.senha !== query.senha) {
            return res.status(400).json({ mensagem: "Senha incorreta" });
        }
    }
    if (body.numero_conta) {
        if (contaEncontrada.usuario.senha !== body.senha) {
            return res.status(400).json({ mensagem: "Senha incorreta" });
        }
    }

    next()
}





module.exports = {
    validarSenha,
    camposInformados,
    cpfEmailJaCadastrados,
    senhasContas

}
