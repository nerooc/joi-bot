import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("exit")
  .setDescription("Kick the bot from the channel.");

export const execute = async (
  interaction: CommandInteraction,
  client: Client
) => {
  const queue = client.player.getQueue(interaction.guildId);

  if (!queue) {
    await interaction.reply("There are no songs in the queue");
    return;
  }

  queue.destroy();

  await interaction.reply("Why you bully  me?");
};
