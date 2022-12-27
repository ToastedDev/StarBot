import { Command } from "../../structures/Command";
import request from "request";
import { AttachmentBuilder } from "discord.js";

export default new Command({
  name: "goose",
  description: "Gives you a random goose image.",
  run: async ({ interaction }) => {
    await interaction.deferReply();

    request(
      {
        url: "https://source.unsplash.com/random/?goose",
        method: "GET",
      },
      (err, res) => {
        if (err) throw err;

        const attachment = new AttachmentBuilder(res.request.href, {
          name: "goose.png",
        });
        interaction.followUp({
          files: [attachment],
        });
      }
    );
  },
});
