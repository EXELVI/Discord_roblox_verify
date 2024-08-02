const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: "Shows the bot's latency",
    category: "general",
    async execute(interaction) {
        const client = require('../../client.js');
        interaction.channel.send('Calculating...').then(async (msg) => {
            msg.delete()
            var embed = new Discord.EmbedBuilder()
                .setTitle("🏓 Pong! 🏓")
                .addFields({ name: "Bot latency", value: `${msg.createdTimestamp - interaction.createdTimestamp}ms` }, { name: "API latency", value: `${Math.round(client.ws.ping)}ms` })
                interaction.reply({embeds: [embed]})
        })
       
    }
}
