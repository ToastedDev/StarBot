import { Command } from "../../structures/Command";
import { AttachmentBuilder } from "discord.js";
import axios from "axios";

export default new Command({
  name: "meme",
  description: "Gives you a random meme.",
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const res = await axios.get("https://www.reddit.com/r/memes/random/.json");
    const content = res.data[0].data.children[0].data.title;
    const attachment = new AttachmentBuilder(
      res.data[0].data.children[0].data.url,
      { name: "meme.png" }
    );

    interaction.followUp({
      content,
      files: [attachment],
    });
  },
});
