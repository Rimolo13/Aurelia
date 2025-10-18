import { REST, Routes } from "discord.js";
import config from "../../configuration/config.json" with { type: 'json' };
import fs from "fs";
const token: any = config[0].token;
const guildId: any = config[0].guildId;
const clientId: any = config[0].clientId;
const commands: any[] = [];

export class DeployCommands {

  constructor() {
    if (fs.existsSync("./commands")) {
      this.DeployCommands();
    }
  }

  async DeployCommands() {
    const commandFiles = fs.readdirSync(`./commands`).filter((file) => file.endsWith(`.js`));
    for (const commandFile of commandFiles) {
      const command = (await import(`../commands/${commandFile}`)).default;
      try {
        commands.push(command.data.toJSON());
      } catch (error) {
        console.error(`Error loading command from ${commandFile}:`, error);
      }
    }

    const restClient = new REST().setToken(token);

    restClient
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  }
}
