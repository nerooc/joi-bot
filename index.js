require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require("discord-player")

const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]
});

const commands = [];
client.commands = new Collection();

const commandCategories = ['music', 'games', 'utility'];
const commandsPath = path.join(__dirname, "commands"); 
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const category of commandCategories) {
    const commandFiles = fs.readdirSync(path.join(commandsPath, category)).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, category, file));
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
}

// Add the player on the client
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

client.on("ready", () => {
    // Get all ids of the servers
    const guild_ids = client.guilds.cache.map(guild => guild.id);


    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), 
            {body: commands})
        .then(() => console.log('Successfully updated commands for guild ' + guildId))
        .catch(console.error);
    }
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try
    {
        await command.execute({client, interaction});
    }
    catch(error)
    {
        console.error(error);
        await interaction.reply({content: "There was an error executing this command"});
    }
});

client.login(process.env.TOKEN);