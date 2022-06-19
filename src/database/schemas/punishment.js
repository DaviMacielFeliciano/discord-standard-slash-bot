const { Schema, model } = require("mongoose");

const punishmentSchema = Schema({
    userId: String,
    authorId: String,
    guildId: String,
    logGuildId: String,
    logChannelId: String,
    logMessageId: String,
    reason: String,
    time: Number,
    proof: String,
    createdAt: Number,
    performed: Boolean,
    data: String,
    type: String,
})

module.exports = model("Punishment", punishmentSchema);