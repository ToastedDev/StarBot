import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType } from "discord.js";
import { getRandomInteger } from "../../functions";

export default new Command({
  name: "rate",
  description: "Rates something.",
  options: [
    {
      name: "something",
      description: "The thing to rate.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: ({ interaction }) => {
    const something = interaction.options.getString("something");
    const rating = getRandomInteger(0, 100);

    interaction.reply({
      content: `I rate **${something}** a **${rating}/100**.`,
    });
  },
});
