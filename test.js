require('dotenv').config();
const Discord = require('discord.js');
const client = require('./client.js');

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    const embed = new Discord.EmbedBuilder()
        .setTitle('Verification')
        .setColor('Green');
        
        const button = new Discord.ButtonBuilder()
        .setCustomId('verify')
        .setLabel('Verify')
        .setStyle('Primary')
        .setEmoji('✅');

    const row = new Discord.ActionRowBuilder()
        .addComponents(button);

    const channel = await client.channels.fetch('1268910245741068321');
    channel.send({ embeds: [embed], components: [row] });
});

client.login(process.env.token);