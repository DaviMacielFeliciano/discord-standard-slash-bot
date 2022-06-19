const { Schema, model } = require("mongoose");

const Message = Schema({
    guildId: String,
    channelId: String,
    messageId: String,
    type: String
})

module.exports = model("Message", Message);