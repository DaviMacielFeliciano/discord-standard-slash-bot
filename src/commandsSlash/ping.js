const Command = require('../objects/structures/Command.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Mostra o ping do bot.'
        })
    }

    run = (interaction) => {
        interaction.reply({
            content: `O ping do bot é \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}