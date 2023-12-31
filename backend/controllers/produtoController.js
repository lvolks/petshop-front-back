const produtoModel = require('../models/produtoModel');
const categoriaModel = require('../models/categoriaModel');


class ProdutoController {
    async salvar(req, res) {
        const produto = req.body;
        const max = await produtoModel.findOne({}).sort({ codigo: -1 });
        produto.codigo = max == null ? 1 : max.codigo + 1;

        const categoria = await categoriaModel.findOne({ codigo: produto.categoria_id });
        produto.categoria = categoria.nome;


        const resultado = await produtoModel.create(produto);
        res.status(201).json(resultado);
    }

    async listar(req, res) {
        const resultado = await produtoModel.find({});
        res.status(200).json(resultado);
    }

    async buscarPorCodigo(req, res) {
        const codigo = req.params.codigo;
        const resultado = await produtoModel.findOne({ 'codigo': codigo });
        res.status(200).json(resultado);
    }

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        const _codigo = String((await produtoModel.findOne({ 'codigo': codigo }))._id);
        await produtoModel.findByIdAndUpdate(String(_codigo), req.body);
        res.status(200).send();
    }

    async excluir(req, res) {
        const codigo = req.params.codigo;
        const _codigo = String((await produtoModel.findOne({ 'codigo': codigo }))._id);
        await produtoModel.findByIdAndRemove(String(_codigo));
        res.status(200).send();
    }
}

module.exports = new ProdutoController();