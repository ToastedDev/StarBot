import { Command } from "../../structures/Command";
import { AttachmentBuilder } from "discord.js";
import axios from "axios";

export default new Command({
  name: "outofcontext",
  description: "Gives you a random out of context image.",
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const res = await axios.get("https://starbotapi.imtca.repl.co/ooc/");
    const attachment = new AttachmentBuilder(res.data.url, {
      name: `${res.data.number}.png`,
    });

    interaction.followUp({
      content: `Out of context image #${res.data.number}/${res.data.maximum}`,
      files: [attachment],
    });
  },
});
