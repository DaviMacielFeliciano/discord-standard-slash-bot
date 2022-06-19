const Event = require('../objects/structures/Event')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'raw'
        })
    }

    run = async (data) => {
        try {
            if (data.t == "MESSAGE_REACTION_ADD") {
                if (data.d.emoji.name == "🎉") {
                    if (data.d.channel_id == "959873203801575476") {
                        let user = await (await this.client.guilds.cache.get("954850644542521364")).members.cache.get(data.d.user_id);
                        if (!user || user.bot) return;
                        user.roles.add("969364608160784474")
                    }
                }
            }
            if (data.t == "MESSAGE_REACTION_REMOVE") {
                if (data.d.emoji.name == "🎉") {
                    if (data.d.channel_id == "959873203801575476") {
                        let user = await (await this.client.guilds.cache.get("954850644542521364")).members.cache.get(data.d.user_id);
                        if (!user || user.bot) return;
                        if(user.roles.cache.has("969364608160784474")) {
                        user.roles.remove("969364608160784474")
                        }
                    }
                }
            }
            if (data.t == "MESSAGE_REACTION_ADD") {
                let messageCheck = await this.client.database.messages.findOne({ guildId: data.d.guild_id, channelId: data.d.channel_id, messageId: data.d.message_id });
                if (messageCheck && data.d.emoji.name == this.client.ticketConfig.emojiName) {
                    let user = await this.client.users.cache.get(data.d.user_id);
                    if (!user || user.bot) return;
                    let guild = await this.client.guilds.cache.get(data.d.guild_id);
                    if (!guild) return;
                    let channel = await guild.channels.cache.get(data.d.channel_id);
                    if (!channel) return;
                    let message = await channel.messages.fetch(data.d.message_id).catch(() => { });
                    if (!message) return;
                    (await message.reactions.cache.get(this.client.ticketConfig.emojiName)).users.remove(data.d.user_id);
                    let categoryCreateTicket = new MessageEmbed()
                        .setAuthor({name: 'Criando o seu ticket...', iconURL: `https://images-ext-2.discordapp.net/external/5aLUTWIivJkDjWWx5dtVc_nXNyX1V8N9LKY9P6UgRVI/%3Fsize%3D96%26quality%3Dlossless/https/cdn.discordapp.com/emojis/969313979048558652.webp`})
                        .setDescription('Pedimos que verifique sua **DM**, enviamos um menu de seleção de categoria em seu privado.').setColor('#36393f')
                        .setThumbnail(`${user.displayAvatarURL()}`)
                        .setFooter({ text: `Verifique o seu privado ${user.username}!`, iconURL: `https://cdn.discordapp.com/emojis/975164601178153060.gif?size=96&quality=lossless`})
                        let errorCategoryCreateTicket = new MessageEmbed()
                        .setAuthor({ name: `Não foi possível criar o seu ticket!`, iconURL: user.displayAvatarURL() })
                        .setDescription(`Isso ocorre pelo motivo do seu privado estar **desativado** ou você não está compartilhando o mesmo sendo que eu.`)
                        .setImage(`https://minecraftskinstealer.com/achievement/6/${user.username}/DM+desativada!`)
                        let categorySelectorEmbed = new MessageEmbed()
                        .setAuthor({ name: `${user.username}`, iconURL: user.displayAvatarURL() })
                        .setDescription(`Classique algumas das categorias abaixo para abrir o seu canal de suporte!`)
                        .setColor("	#ffffff")                    
                    let options = [];
                    for (let category in this.client.categories) {
                        let categoryOptions = this.client.categories[category];
                        options.push({
                            label: `${categoryOptions.name}`,
                            emoji: categoryOptions.emoji,
                            value: `${category}`,
                        });
                    }
                    const row = new MessageActionRow().addComponents(
                        new MessageSelectMenu()
                            .setCustomId(`category-select`)
                            .setPlaceholder('Escolha a categoria que você deseja')
                            .addOptions(options)
                    );
                    let msg = await this.client.channels.cache.get("972112139579973653").send({ embeds: [categoryCreateTicket] })
                    setTimeout(() => { msg.delete().catch(() => { }); }, 3000)
                    let categorySelector = await user.send({ embeds: [categorySelectorEmbed], components: [row] }).catch(() => { this.client.channels.cache.get("969079101182849034").send({ embeds: [errorCategoryCreateTicket] }).then(msg => setTimeout(() => { msg.delete().catch(() => { }); }, 3000)).catch(() => { }) });
                    const filter = (interaction) => interaction.user.id == data.d.user_id;
                    const collector = categorySelector.createMessageComponentCollector({ filter, time: 120000 });
                    collector.on("collect", i => {
                        i.deferUpdate();
                        let id = i.values[0];
                        if (!i.customId || i.customId != "category-select" || !id) return;
                        let category = this.client.categories[id];
                        let index = this.client.selects.findIndex(select => select.userId === i.user.id);
                        if (index === -1) {
                            this.client.selects.push({ userId: i.user.id, category: id });
                        } else {
                            let current = this.client.selects[index];
                            let newObject = { ...current, category: id };
                            this.client.selects[index] = newObject;
                        }
                        this.client.functions.updateMessages();
                        let successEmbed = new MessageEmbed()
                            .setTitle("O seu canal foi classificado!")
                            .setDescription("⠀\nTodas as mensagens enviadas abaixo será redirecionada para a nossa central de suporte!")
                            .setFooter({ text: `${category.name}` })
                            .setColor("#00FF00");
                        categorySelector.reply({ embeds: [successEmbed] }).catch(() => { });
                    });
                }
            }
        } catch (error) {
            if (error) console.error(error);
        }
    }
}