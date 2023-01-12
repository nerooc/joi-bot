import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("resume")
  .setDescription("Resumes the current song");

export const execute = async (
  interaction: CommandInteraction,
  client: Client
) => {
  // Get the queue for the server
  const queue = client.player.getQueue(interaction.guildId);

  // Check if the queue is empty
  if (!queue) {
    await interaction.reply("No songs in the queue");
    return;
  }

  // Pause the current song
  queue.setPaused(false);

  // Reply with a success message
  await interaction.reply("Player has been resumed.");
};
