const colors = require('colors/safe');
const Discord = require('discord.js');
const chalk = require('chalk');


const ascii = [
`    888     888                  d8b  .d888          `,
`    888     888                  Y8P d88P"           `,
`    888     888                      888             `,
`    Y88b   d88P  .d88b.  888d888 888 888888 888  888 `,
`     Y88b d88P  d8P  Y8b 888P"   888 888    888  888 `,
`      Y88o88P   88888888 888     888 888    888  888 `,
`       Y888P    Y8b.     888     888 888    Y88b 888 `,
`        Y8P      "Y8888  888     888 888     "Y88888 `,
`                                                 888 `,
`                                            Y8b d88P `,
`                                             "Y88P"  `,
]

function fadeColors(colors) {
    const startColor = [0, 0, 255];  // Blu
    const endColor = [255, 0, 0];  // Rosso


    const colorSteps = colors.length - 1;

    const colorFade = [];
    for (let i = 0; i <= colorSteps; i++) {
        const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * (i / colorSteps));
        const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * (i / colorSteps));
        const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * (i / colorSteps));
        colorFade.push([r, g, b]);
    }

    for (let i = 0; i < colorFade.length; i++) {
        const color = colorFade[i];
        console.log(chalk.rgb(color[0], color[1], color[2])(colors[i]))
    }
}

module.exports = {
    name: 'ready',
    execute: async () => {
        const client = require('../../client.js');
        console.log("Bot is ready!");
        colors.enable();
        console.log(colors.green(`-- ONLINE --`));
        fadeColors(ascii);
        console.log(colors.red(`
User: ${client.user.tag}
      
        `))

        const databasePromise = require('../../db.js');

        databasePromise.then(async database => {
        var db = await database.db("roblox")
        if (process.env.commands != "false") {

            const globalCommands = []

            console.log("Starting commands creation!")
            let guildCommands = []

            await client.commands
                .forEach(async command => {
                    let data = command.data || {}
                    data.name = command.name
                    data.description = (command.onlyStaff ? "🔒" : "") + command.description
                    if (command.options) data.options = command.options
                    if (command.integration_types) data.integration_types = command.integration_types
                    if (command.contexts) data.contexts = command.contexts

                    if (!guildCommands.find(x => x.name == command.name)) {
                        globalCommands.push(data)

                        if (command.type) {
                            var data2 = {
                                name: command.name,
                                type: command.type,
                            }
                            if (command.integration_types) data2.integration_types = command.integration_types
                            if (command.contexts) data2.contexts = command.contexts
                            globalCommands.push(data2)
                        }
                    }
                })

            const rest = new Discord.REST().setToken(process.env.token);

            console.log(`Started refreshing ${globalCommands.length} application (/) commands.`);

            const data = await rest.put(
                Discord.Routes.applicationCommands("1268901862422089759"),
                { body: globalCommands },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);


            data.forEach(async cmd => {
                var cmdDb = await db.collection("commands").findOne({ name: cmd.name })
                if (!cmdDb) {
                    db.collection("commands").insertOne({ name: cmd.name, id: cmd.id })
                } else {

                    db.collection("commands").updateOne({ name: cmd.name }, { $set: { id: cmd.id } })
                }

                console.log("------------------------ Created ------------------------\n", cmd.name)
            })


            console.log("Commands created!")
        } else console.log("Commands creation disabled!")
    })


    }
}