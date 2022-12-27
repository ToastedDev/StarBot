import { ChatInputCommandInteraction } from "discord.js";
import { ChatInputInteraction } from "../structures/Command";
import { Event } from "../structures/Event";

export default new Event("interactionCreate", async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.inGuild())
    return (interaction as ChatInputCommandInteraction<"cached" | "raw">).reply(
      {
        content: "My commands only work in servers.",
      }
    );

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.run({
      client,
      interaction: interaction as ChatInputInteraction,
    });
  } catch (err) {
    console.error(err);
  }
});
