import {
  ApplicationCommandDataResolvable,
  Client,
  GatewayIntentBits,
  Collection,
  ClientOptions,
} from "discord.js";
import fs from "fs";
import path from "path";
import { guildId } from "../config";
import { CommandType } from "./Command";

export class BotClient<Ready extends boolean = boolean> extends Client<Ready> {
  commands = new Collection<string, CommandType>();

  constructor(options?: Omit<ClientOptions, "intents">) {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
      ...options,
    });
  }

  connect() {
    this.login(process.env.TOKEN);
  }

  private async importFile(dir: string) {
    try {
      return await import(dir).then((x) => x.default);
    } catch {
      return null;
    }
  }

  private validateFile(file: string) {
    return file.endsWith("ts") || file.endsWith("js");
  }

  register() {
    // Slash commands
    const commands: ApplicationCommandDataResolvable[] = [];
    fs.readdirSync(path.join(__dirname, "../commands")).forEach(async (dir) => {
      const commandFiles = fs
        .readdirSync(path.join(__dirname, `../commands/${dir}`))
        .filter((file) => this.validateFile(file));

      for (const file of commandFiles) {
        const command = await this.importFile(`../commands/${dir}/${file}`);
        if (!command?.name || !command?.description || !command?.run) return;

        this.commands.set(command.name, command);
        commands.push(command);
      }
    });

    this.on("ready", async () => {
      if (guildId && guildId.length) {
        const guild = this.guilds.cache.get(guildId);
        if (!guild) return console.log(`No guild exists with ID ${guildId}.`);

        guild.commands.set(commands);
        console.log(`Registered commands in ${guild.name}.`);
      } else {
        this.application?.commands.set(commands);
        console.log("Registered commands globally.");
      }
    });

    // Events
    fs.readdirSync(path.join(__dirname, "../events"))
      .filter((file) => this.validateFile(file))
      .forEach(async (file) => {
        const event = await this.importFile(`../events/${file}`);
        if (!event?.name || !event?.run) return;

        this.on(event.name, event.run.bind(null, this));
      });
  }
}
