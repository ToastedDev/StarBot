import { ClientEvents } from "discord.js";
import { BotClient } from "./BotClient";

export class Event<K extends keyof ClientEvents> {
  constructor(
    public name: K,
    public run: (client: BotClient<true>, ...args: ClientEvents[K]) => any
  ) {}
}
