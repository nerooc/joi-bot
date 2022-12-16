import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("test command")
  .setDescription("test command to show the bot works");

export const execute = async (interaction: CommandInteraction) => {
  if (
    !interaction.isChatInputCommand() ||
    !(interaction?.member instanceof GuildMember)
  )
    return;

  await interaction.reply("Test command works!");
};
