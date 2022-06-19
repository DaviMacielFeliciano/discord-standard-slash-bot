const { Schema, model } = require("mongoose");

const perfilsystem = Schema({
    authorId: String,
    authorName: String,
    createdAt: Number,
    history: Array,
    Anonnymo: Boolean,
    numberTickets: Number,
    timeMention: Number,
    timeEnabled: Boolean,
    avatarURL: String,
    nameAnonymous: String,
})

module.exports = model("Perfil", perfilsystem);