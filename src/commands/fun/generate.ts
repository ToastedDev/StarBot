import { ApplicationCommandOptionType, AttachmentBuilder } from "discord.js";
import { Command } from "../../structures/Command";
import { Client } from "craiyon";

const craiyon = new Client();

export default new Command({
  name: "generate",
  description: "Generate an image using Craiyon (formerly DALL-E Mini).",
  options: [
    {
      name: "prompt",
      description: "The prompt for the image.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const prompt = interaction.options.getString("prompt");

    const image = await craiyon.generate({ prompt });
    const attachment = new AttachmentBuilder(image.images[0].asBuffer(), {
      name: "generated.png",
    });

    interaction.followUp({
      content: `Prompt: ${prompt}`,
      files: [attachment],
    });
  },
});
