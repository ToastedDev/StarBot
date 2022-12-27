import { Command } from "../../structures/Command";
import animals from "animals.js";
import { AttachmentBuilder } from "discord.js";

export default new Command({
  name: "cat",
  description: "Gives you a random cat image.",
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const attachment = new AttachmentBuilder(await animals.cat(), {
      name: "cat.png",
    });

    interaction.followUp({
      files: [attachment],
    });
  },
});
