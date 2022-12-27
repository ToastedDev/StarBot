import { Command } from "../../structures/Command";

export default new Command({
  name: "ping",
  description: "Pings the bot.",
  run: async ({ client, interaction }) => {
    const res = await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    const ping = res.createdTimestamp - interaction.createdTimestamp;

    interaction.followUp({
      content: `Heartbeat: **${ping}ms**\nLatency: **${client.ws.ping}ms**`,
    });
  },
});
