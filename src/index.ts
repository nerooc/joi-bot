// @ts-nocheck

import { Player } from "discord-player";
import {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
} from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Firestore } from "@google-cloud/firestore";
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

const key = config.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, "\n");

const firestore = new Firestore({
  projectId: "joi-discord-bot",
  credentials: {
    client_email: config.FIRESTORE_CLIENT_EMAIL,
    private_key: key,
  },
});

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
  client.user?.setActivity("your needs", {
    type: ActivityType.Listening,
  });

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

  let parameter;
  let key;

  const keys = [
    "searchterms",
    "url",
    "playlist",
    "query",
    "text",
    "gamelist",
    "content",
  ];

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    if (interaction.options.getString(key)) {
      parameter = interaction.options.getString(key);
      break;
    }
  }

  const currentDate = new Date().toISOString();

  await firestore
    .collection("user_requests")
    .doc(`${interaction.user.username}-${currentDate}`)
    .set({
      command: interaction.commandName,
      param: parameter,
      date: new Date(),
    });

  try {
    const response = await command.execute(interaction, client);

    if (key == "content" || key == "searchterms") {
      await firestore
        .collection("user_requests")
        .doc(`${interaction.user.username}-${currentDate}`)
        .set({
          command: interaction.commandName,
          param: parameter,
          response: response,
          date: new Date(),
        });
    }
  } catch (error) {
    console.error(error);
    // @ts-ignore
    await interaction.reply({
      content: "There was an error executing this command",
    });
  }
});

client.login(config.DISCORD_TOKEN);
