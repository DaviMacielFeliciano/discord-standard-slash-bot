require('dotenv').config()

const config = require("./src/configs/config.json")
const Client = require('./src/objects/structures/Client')
const { connectToDatabase } = require("./src/database/index.js");

const client = new Client({
    intents: 32767,
    partials: ["CHANNEL"]
})

client.login(config.token)
connectToDatabase();