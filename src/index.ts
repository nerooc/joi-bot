import { Player } from "discord-player";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "./config";
import * as commandModules from "./commands";

type Command = {
  data: unknown;
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const commands: any[] = [];
client.commands = new Collection();

// Add the player on the client
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

client.on("ready", () => {
  const commands: any[] = [];

  for (const module of Object.values<Command>(commandModules)) {
    commands.push(module.data);
  }

  const guild_ids = client.guilds.cache.map((guild: any) => guild.id);
  const rest = new REST({ version: "9" }).setToken(config.DISCORD_TOKEN);

  for (const guildId of guild_ids) {
    rest
      .put(Routes.applicationGuildCommands(config.CLIENT_ID, guildId), {
        body: commands,
      })
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = Object(commandModules)[interaction.commandName];

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    // @ts-ignore
    await interaction.reply({
      content: "There was an error executing this command",
    });
  }
});

client.login(config.DISCORD_TOKEN);
