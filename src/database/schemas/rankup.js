const { Schema, model } = require("mongoose");

const rankSchema = Schema({
    userId: String,
    userTag: String,
    levelNumber: Number,
    xpAtual: Number,
    xpNecessario: Number,
    firstDate: String
})

module.exports = model("RankUP", rankSchema);