const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
const Functions = require("../functions.js");

const config = require("../../configs/config.json")

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.commands = []
        this.loadCommands();
        this.loadEvents();
        this.startedAt = performance.now();
        this.functions = new Functions(this);
        this.config = config;
        this.ticketConfig = this.config.ticketConfig;
    }
    registrySlashCommands() {
        this.guilds.cache.get(this.config.ticketConfig.mainGuildId).commands.set(this.commands)
    }
    loadCommands(path = 'src/commandsSlash') {
        const commands = readdirSync(`${path}`)

        for (const command of commands) {
            const commandClass = require(join(process.cwd(), `${path}/${command}`))
            const cmd = new (commandClass)(this)

            this.commands.push(cmd)
        }
    }

    loadEvents(path = 'src/events') {
        const events = readdirSync(`${path}`)

        for (const event of events) {
            const eventClass = require(join(process.cwd(), `${path}/${event}`))
            const evt = new (eventClass)(this)

            this.on(evt.name, evt.run)
        }
    }
}