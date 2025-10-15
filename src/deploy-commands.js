import { REST, Routes } from "discord.js";
import config from './config.json' with { type: 'json' };
const token = config[0].token;
const guildId = config[0].guildId;
const clientId = config[0].clientId;
import fs from "fs";

const commands = [];

const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));

commandFiles.forEach(commandFile => {
  const command = require('./commands/${commandFile}');
  commands.push(command.data.toJSON());
});

const rest = new REST().setToken(token);

restClient.put(Routes.applicationGuildCommands(clientId, guildId),
{ body: commands })
.than(() => console.log('Successfully registered application commands.'))
.catch(console.error);