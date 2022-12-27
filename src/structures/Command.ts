import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  GuildMember,
} from "discord.js";
import { BotClient } from "./BotClient";

export interface ChatInputInteraction extends ChatInputCommandInteraction {
  member: GuildMember;
}

export type CommandType = ChatInputApplicationCommandData & {
  run: (params: {
    client: BotClient<true>;
    interaction: ChatInputInteraction;
  }) => any;
};

export class Command {
  constructor(options: CommandType) {
    Object.assign(this, options);
  }
}
