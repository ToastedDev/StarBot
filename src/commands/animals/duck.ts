import { Command } from "../../structures/Command";
import animals from "animals.js";
import { AttachmentBuilder } from "discord.js";

export default new Command({
  name: "duck",
  description: "Gives you a random duck image.",
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const attachment = new AttachmentBuilder(await animals.duck(), {
      name: "duck.png",
    });

    interaction.followUp({
      files: [attachment],
    });
  },
});
