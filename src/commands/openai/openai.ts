import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import config from "../../config";

export const data = new SlashCommandBuilder()
  .setName("openai")
  .setDescription("use openai api")
  .addStringOption((option) =>
    option.setName("content").setDescription("openai content").setRequired(true)
  );

export const execute = async (interaction: CommandInteraction) => {
  if (
    !interaction.isChatInputCommand() ||
    !(interaction?.member instanceof GuildMember)
  )
    return;

  const queryString = interaction.options.getString("content");

  if (!queryString) {
    await interaction.reply("You must provide a content for openai");
    return;
  }

  const configuration = new Configuration({
    apiKey: config.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  await interaction.deferReply();
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: queryString,
    temperature: 0,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // @ts-ignore
  await interaction.editReply(response.data.choices[0].text);

  return response.data.choices[0].text;
};
