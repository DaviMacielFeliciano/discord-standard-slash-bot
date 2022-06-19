const { Schema, model } = require("mongoose");

const Avaliacao = Schema({
    userId: String,
    closed: String,
    channelId: String,
})

module.exports = model("Avaliacao", Avaliacao);