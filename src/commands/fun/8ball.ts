import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType } from "discord.js";
import axios from "axios";

export default new Command({
  name: "8ball",
  description: "Answering life's most important questions.",
  options: [
    {
      name: "question",
      description: "The question to answer.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const question = interaction.options.getString("question");
    const res = await axios.get("https://starbotapi.imtca.repl.co/8ball/");

    interaction.followUp({
      content: `Q: ${question}\nA: ${res.data.response}`,
    });
  },
});
