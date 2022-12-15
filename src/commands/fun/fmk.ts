import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("fmk")
  .setDescription("play fmk with other users in the server");

export const execute = async (interaction: CommandInteraction) => {
  if (
    !interaction.isChatInputCommand() ||
    !(interaction?.member instanceof GuildMember)
  )
    return;

  const users = [];
  const author = interaction.user.username;
  const length = 3;

  for (let i = 0; i < length; i++) {
    users[i] = interaction.guild?.members.cache.random()?.user.username;
  }

  const msg = `${author} + ": \nzabije " + ${users[0]} + ", \npoślubi " + ${users[1]} + " \ni cimcirimci ram pam pam z " + ${users[2]}`;
  await interaction.reply(msg);
};
