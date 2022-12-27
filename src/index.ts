import "dotenv/config";

import { BotClient } from "./structures/BotClient";
import { ActivityType } from "discord.js";

const client = new BotClient({
  presence: {
    activities: [
      {
        name: "the stars",
        type: ActivityType.Watching,
      },
    ],
  },
});

client.connect();
client.register();
