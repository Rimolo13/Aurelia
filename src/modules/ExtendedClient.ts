import {
  Client,
  Collection,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
}
