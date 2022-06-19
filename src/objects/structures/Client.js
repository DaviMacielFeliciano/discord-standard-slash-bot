const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
const Functions = require("../functions.js");

const Estoque = require("../../database/schemas/estoque.js"),
    Message = require("../../database/schemas/message.js"),
    Ticket = require("../../database/schemas/ticket.js"),
    MemberAdd = require("../../database/schemas/memberadd.js"),
    Cooldown = require("../../database/schemas/cooldown.js"),
    Punishments = require("../../database/schemas/punishment.js"),
    Perfil = require("../../database/schemas/perfil.js"),
    History = require("../../database/schemas/history.js"),
    Avaliacao = require("../../database/schemas/avaliacao.js"),
    RankUP = require("../../database/schemas/rankup.js");

const config = require("../../configs/config.json"),
    customEmojis = require("../../configs/emojis.json"),
    categories = require("../../configs/categories.json"),
    reasons = require("../../configs/reasons.json"),
    estoque = require("../../configs/estoque.json");

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
        this.punishOptions = this.config.punishOptions;
        this.perfilConfig = this.config.perfilConfig;
        this.reasons = reasons;
        this.estoque = estoque;
        this.customEmojis = customEmojis;
        this.categories = categories;
        this.selects = [];
        this.cooldowns = [];
        this.database = [];
        this.database.estoque = Estoque;
        this.database.messages = Message;
        this.database.tickets = Ticket;
        this.database.memberadd = MemberAdd;
        this.database.cooldowns = Cooldown;
        this.database.punishments = Punishments;
        this.database.perfil = Perfil;
        this.database.histories = History;
        this.database.avaliacao = Avaliacao;
        this.database.rankup = RankUP;
    }
    registrySlashCommands() {
        this.guilds.cache.get(this.config.ticketConfig.mainGuildId).commands.set(this.commands)
        this.guilds.cache.get(this.config.ticketConfig.centralGuildId).commands.set(this.commands)
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