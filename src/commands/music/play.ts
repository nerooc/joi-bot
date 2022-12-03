import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
  Client,
  GuildMember,
  ButtonStyle,
  ButtonInteraction,
  ActionRowBuilder,
  ButtonBuilder,
} from "discord.js";
import { EmbedBuilder } from "discord.js";
import { QueryType } from "discord-player";

export const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("play a song from YouTube.")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("search")
      .setDescription("Searches for a song and plays it")
      .addStringOption((option) =>
        option
          .setName("searchterms")
          .setDescription("search keywords")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("playlist")
      .setDescription("Plays a playlist from YT")
      .addStringOption((option) =>
        option
          .setName("url")
          .setDescription("the playlist's url")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("song")
      .setDescription("Plays a single song from YT")
      .addStringOption((option) =>
        option.setName("url").setDescription("the song's url").setRequired(true)
      )
  );

export const execute = async (
  interaction: CommandInteraction,
  client: Client
) => {
  if (
    !interaction.isChatInputCommand() ||
    !(interaction?.member instanceof GuildMember)
  )
    return;

  // Make sure the user is inside a voice channel
  if (!interaction?.member?.voice.channel)
    return interaction.reply(
      "You need to be in a Voice Channel to play a song."
    );

  // Create a play queue for the server
  const queue = await client.player.createQueue(interaction.guild);

  // Wait until you are connected to the channel
  if (!queue.connection)
    await queue.connect(interaction?.member?.voice.channel);

  let embed = new EmbedBuilder();

  if (interaction.options.getSubcommand() === "song") {
    let url = interaction.options.getString("url");

    // Search for the song using the discord-player
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE_VIDEO,
    });

    // finish if no tracks were found
    if (result.tracks.length === 0) return interaction.reply("No results");

    // Add the track to the queue
    const song = result.tracks[0];
    await queue.addTrack(song);
    embed
      .setDescription(
        `**[${song.title}](${song.url})** has been added to the Queue`
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` });
  } else if (interaction.options.getSubcommand() === "playlist") {
    // Search for the playlist using the discord-player
    let url = interaction.options.getString("url");
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE_PLAYLIST,
    });

    if (result.tracks.length === 0)
      return interaction.reply(`No playlists found with ${url}`);

    // Add the tracks to the queue
    const playlist = result.playlist;
    await queue.addTracks(result.tracks);
    embed
      .setDescription(
        `**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`
      )
      .setThumbnail(playlist.thumbnail);
  } else if (interaction.options.getSubcommand() === "search") {
    // Search for the song using the discord-player
    let url = interaction.options.getString("searchterms");
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    // finish if no tracks were found
    if (result.tracks.length === 0) return interaction.editReply("No results");

    // Add the track to the queue
    const song = result.tracks[0];
    await queue.addTrack(song);
    embed
      .setDescription(
        `**[${song.title}](${song.url})** has been added to the Queue`
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` });
  }

  // Play the song
  if (!queue.playing) await queue.play();

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("primary")
      .setLabel("Stop")
      .setStyle(ButtonStyle.Danger)
  );

  const collector = interaction?.channel?.createMessageComponentCollector();

  collector!.on("collect", (i: ButtonInteraction) => {
    const queue = client.player.getQueue(interaction.guildId);
    queue.destroy();
    interaction.deleteReply();
    i?.channel?.send("Destroyed the queue");
  });

  // Respond with the embed containing information about the player
  await interaction.reply({
    embeds: [embed],
    components: [row],
  });
};
