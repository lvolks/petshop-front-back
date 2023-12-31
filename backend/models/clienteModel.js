const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const ClienteSchema = new mongoose.Schema({
  codigo: Number,
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
    lowercase: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  nomeCartao: {
    type: String,
    required: true,
  },
  numeroCartao: {
    type: String,
    required: true,
  },
  cvc: {
    type: Number,
    required: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  dtaCriacao: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    select: false,
  },
  imagem: {
    type: String,
    required: true,
  },
});

ClienteSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.senha, 10);
  this.senha = hash;
  next();
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;
