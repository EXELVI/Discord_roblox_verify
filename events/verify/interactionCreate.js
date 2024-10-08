const Discord = require('discord.js');
const { fetch } = require('undici');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const client = require('../../client.js');

        if (!interaction.isButton()) return;
        if (interaction.customId !== 'verify') return;


        const dm = await interaction.user.createDM();

        var embed = new Discord.EmbedBuilder()
            .setTitle('Verification')
            .setDescription('Please enter your Roblox username.')
            .setColor('Blue');

        if (interaction.channel.type == Discord.ChannelType.DM) {
            interaction.reply({ embeds: [embed] }).then(verifyProcess)
        } else {

            interaction.reply({ content: 'Please check your DMs.', ephemeral: true });
            dm.send({ embeds: [embed] }).then(verifyProcess)
        }


        async function verifyProcess() {
            const filter = m => m.author.id === interaction.user.id;
            dm.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
                .then(async collected => {
                    const username = collected.first().content;


                    const user = await fetch(`https://users.roblox.com/v1/usernames/users`, { method: 'POST', body: JSON.stringify({ usernames: [username] }), headers: { 'Content-Type': 'application/json' } }).then(res => res.json()).then(json => json.data[0]);
                    if (!user) return dm.send('User not found.');
                    const userAvatar = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${user.id}&size=720x720&format=Png&isCircular=false`).then(res => res.json()).then(json => json.data[0].imageUrl);

                    embed = new Discord.EmbedBuilder()
                        .setTitle('Verification')
                        .setDescription(`Is this your Roblox account?\n\n**Username:** ${user.name}\n**ID:** ${user.id}`)
                        .setColor('Blue')
                        .setThumbnail(userAvatar);

                    let buttonYes = new Discord.ButtonBuilder()
                        .setCustomId('yes')
                        .setLabel('Yes')
                        .setStyle('Success');

                    let buttonNo = new Discord.ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('No')
                        .setStyle('Danger');

                    let row = new Discord.ActionRowBuilder()
                        .addComponents(buttonYes, buttonNo);

                    dm.send({ embeds: [embed], components: [row] }).then(async () => {

                        const filter = i => i.user.id === interaction.user.id;
                        const collector = dm.createMessageComponentCollector({ filter, time: 60000 });

                        collector.on('collect', async i => {
                            if (i.customId === 'yes') {
                                const db = (await require('../../db.js')).db('roblox');
                                var userDb = await db.collection('users').findOne({ userID: user.id });
                                if (!userDb) {
                                    await db.collection('users').insertOne({ userID: user.id, discordID: interaction.user.id, verified: false, awaitingVerification: true });
                                } else {
                                    await db.collection('users').updateOne({ userID: user.id }, { $set: { discordID: interaction.user.id, verified: false, awaitingVerification: true } });
                                }
                                let buttonYes = new Discord.ButtonBuilder()
                                    .setCustomId('yes')
                                    .setLabel('Yes')
                                    .setStyle('Success')
                                    .setDisabled(true);

                                let buttonNo = new Discord.ButtonBuilder()
                                    .setCustomId('no')
                                    .setLabel('No')
                                    .setStyle('Danger')
                                    .setDisabled(true);

                                let row = new Discord.ActionRowBuilder()
                                    .addComponents(buttonYes, buttonNo);

                                i.deferUpdate();
                                i.message.edit({ embeds: [embed], components: [row] });


                                embed = new Discord.EmbedBuilder()
                                    .setTitle('Verification')
                                    .setDescription('Please enter in [this experience](https://www.roblox.com/games/9853480045/Verify) to complete the verification process.')
                                    .setColor('Green');

                                let urlButton = new Discord.ButtonBuilder()
                                    .setLabel('Join Game')
                                    .setStyle('Link')
                                    .setURL('https://www.roblox.com/games/9853480045/Verify');


                                dm.send({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents(urlButton)] });
                                collector.stop();

                            } else if (i.customId === 'no') {
                                i.deferUpdate();
                                embed = new Discord.EmbedBuilder()
                                    .setTitle('Do you want to restart the verification process?')
                                    .setColor('Blue');

                                let button = new Discord.ButtonBuilder()
                                    .setCustomId('verify')
                                    .setLabel('Verify')
                                    .setStyle('Primary')
                                    .setEmoji('✅');

                                let row = new Discord.ActionRowBuilder()
                                    .addComponents(button);

                                i.message.edit({ embeds: [embed], components: [row] });

                                collector.stop();

                            }
                        });
                        collector.on('end', async (collected, reason) => {
                            if (reason === 'time') {
                                embed = new Discord.EmbedBuilder()
                                    .setTitle('Verification')
                                    .setDescription('You took too long to respond.')
                                    .setColor('Red');

                                dm.send({ embeds: [embed] });
                            }
                        });
                    });






                })


        }
    }
}
