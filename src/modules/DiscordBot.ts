import {
  Client,
  IntentsBitField,
  GatewayIntentBits,
  Partials
} from "discord.js";

import { LoadFeatures } from "./LoadFeatures.js";
import { AutoUpdate } from "./AutoUpdate.js";
import { DeployCommands } from "./DeployCommands.js";
import { LoadCommands } from "./LoadCommands.js";
import { error } from "console";

export class DiscordBot {
  instance: Client;

  constructor(token: any) {
    this.instance = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
      ],
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
      ],
      allowedMentions: {
        parse: ["everyone"],
        repliedUser: true,
      },
    });

    new LoadFeatures(this.instance);
    new AutoUpdate();
    new DeployCommands();
    new LoadCommands(this.instance);

    this.instance.once("clientReady", (client: Client) => {
      console.log(`${this.instance.user?.username} ist Online🌐`);
    }); 

      this.instance.login(token).catch((error) => {
      console.log(`None or False Discord Token!`);
      });
  }
}
