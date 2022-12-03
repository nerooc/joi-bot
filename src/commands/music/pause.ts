import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pauses the current song");

export const execute = async (
  interaction: CommandInteraction,
  client: Client
) => {
  // Get the queue for the server
  const queue = client.player.getQueue(interaction.guildId);

  // Check if the queue is empty
  if (!queue) {
    await interaction.reply("There are no songs in the queue");
    return;
  }

  // Pause the current song
  queue.setPaused(true);

  await interaction.reply("Player has been paused.");
};
