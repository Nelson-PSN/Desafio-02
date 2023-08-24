const bancodedados = require('../bancodedados');
const { format } = require('date-fns');

const contaExistente = (numeroConta) => {
    return bancodedados.contas.find(usuario => {
        return Number(usuario.numero) == Number(numeroConta)
    })
}

const dataFormatada = () => {
    data = format(new Date(), 'dd-MMM-yyyy  H:mm:ss');
    return data;
}

module.exports = {
    contaExistente,
    dataFormatada,
}