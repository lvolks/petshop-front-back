const pedidoModel = require('../models/pedidoModel');
const clienteModel = require('../models/clienteModel');

class PedidoController {
    async salvar(req, res) {
        const pedido = req.body;
        const max = await pedidoModel.findOne({}).sort({ codigo: -1 });
        pedido.codigo = max == null ? 1 : max.codigo + 1;

        const cliente = await clienteModel.findOne({ codigo: pedido.cliente_id });
        pedido.cliente = cliente.nome;

        const resultado = await pedidoModel.create(pedido);
        res.status(201).json(resultado);
    }

    async listar(req, res) {
        const resultado = await pedidoModel.find({ 'clienteId': req.params.clienteId });
        res.status(200).json(resultado);
    }

    async buscarPorCodigo(req, res) {
        const { clienteId, codigo } = req.params;
        const resultado = await pedidoModel.findOne({ 'codigo': codigo, 'clienteId': clienteId });
        res.status(200).json(resultado);
    }
}

module.exports = new PedidoController();

