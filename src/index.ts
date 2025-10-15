import { DiscordBot } from "./modules/DiscordBot.js";
import config from '../configuration/config.json' with { type: 'json' };

const discordBot = new DiscordBot(config[0].token);