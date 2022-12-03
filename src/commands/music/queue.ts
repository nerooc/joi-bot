import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("queue")
  .setDescription("shows first 10 songs in the queue");

export const execute = async (
  interaction: CommandInteraction,
  client: Client
) => {
  const queue = client.player.getQueue(interaction.guildId);

  // check if there are songs in the queue
  if (!queue || !queue.playing) {
    await interaction.reply("There are no songs in the queue");
    return;
  }

  // Get the first 10 songs in the queue
  const queueString = queue.tracks
    .slice(0, 10)
    .map((song: any, i: number) => {
      return `${i + 1}) [${song.duration}]\` ${song.title} - <@${
        song.requestedBy.id
      }>`;
    })
    .join("\n");

  // Get the current song
  const currentSong = queue.current;

  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setDescription(
          `**Currently Playing**\n` +
            (currentSong
              ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>`
              : "None") +
            `\n\n**Queue**\n${queueString}`
        )
        .setThumbnail(currentSong.setThumbnail),
    ],
  });
};
