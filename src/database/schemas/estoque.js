const { Schema, model } = require("mongoose");

const Estoque = Schema({
    tipoEstoque: String,
    quantidade: Number,
})

module.exports = model("Estoque", Estoque);