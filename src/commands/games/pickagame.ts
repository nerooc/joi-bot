import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pickagame")
  .setDescription("pick a game from a list you provide")
  .addStringOption((option) =>
    option
      .setName("gamelist")
      .setDescription("list of games to choose from (separate with whitespace)")
      .setRequired(true)
  );

export const execute = async (interaction: CommandInteraction) => {
  if (
    !interaction.isChatInputCommand() ||
    !(interaction?.member instanceof GuildMember)
  )
    return;

  const queryString = interaction.options.getString("gamelist");

  if (!queryString) {
    await interaction.reply("You must provide a list of games to choose from");
    return;
  }

  const gameList = queryString.split(/\s+/);
  const randomGame = gameList[Math.floor(Math.random() * gameList.length)];

  await interaction.reply("stop playing games");
};
