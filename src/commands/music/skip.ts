import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Skips to the next song in the queue");

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

  const skippedSong = queue.current;

  // Pause the current song
  queue.skip();

  await interaction.reply(`${skippedSong} has been skipped.`);
};
