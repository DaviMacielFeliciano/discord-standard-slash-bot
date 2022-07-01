const Event = require('../objects/structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        let server = await this.client.guilds.cache.get("969461106819076116")
        const getRandomRichPresence = (size) => [`📪 | Estamos com ${size} membros.`, `⚡ | Standard-slash-bot`][Math.floor(Math.random() * 2)]
        const updatedRichPresence = () => {
            let msg = getRandomRichPresence(this.client.guilds.cache.get(this.client.ticketConfig.mainGuildId).members.cache.size);

            this.client.user.setActivity(msg, {
                game: {
                    type: 1
                }
            });

        }
        setInterval(updatedRichPresence, 1000 * 10);
        this.client.registrySlashCommands();
        setInterval(async () => {
            this.client.functions.checkMessages();
            this.client.functions.checkTickets();
            this.client.functions.updateMessages();
        }, 15000)
        let finishedAt = performance.now();
        let time = (parseFloat(finishedAt - this.client.startedAt).toFixed(2)).replace(".00", "");
        console.log(`\x1b[38;5;75m✔ [${this.client.user.username}] Conexão com o Discord efetuada em ${time}ms\x1b[0m`);
    }
}