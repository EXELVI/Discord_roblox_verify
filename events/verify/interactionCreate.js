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

            interaction.reply({ content: 'Please check your DMs.', ephemeral: true });

        dm.send({ embeds: [embed] }).then(() => {
            const filter = m => m.author.id === interaction.user.id;
            dm.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const username = collected.first().content; 


                    //fetch roblox api to get user info and avatar

                    fetch(`https://api.roblox.com/users/get-by-username?username=${username}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.success === false) {
                                dm.send('Invalid username.');
                                return;
                            }

                            const userId = data.Id;
                            const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`;

                            embed = new Discord.EmbedBuilder()
                                .setTitle('Verification')
                                .setDescription(`Is this your Roblox account?`)
                                .setColor('Blue')
                                .setThumbnail(avatarUrl)
                                .addField('Username', username)
                                .addField('User ID', userId);



                        })

                })
                

        })
    }
}
