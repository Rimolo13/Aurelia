import { ChatInputCommandInteraction ,Collection} from "discord.js";
import { ExtendedClient } from "./ExtendedClient";
import fs from "fs";

export class LoadCommands {
  instance: ExtendedClient;
  constructor(instance: ExtendedClient) {
    this.instance = instance;
    if (fs.existsSync("./commands")) {
        instance.commands = new Collection();
        this.LoadCommands();

      instance.on("interaction", async (interaction: ChatInputCommandInteraction) => {
        if (!interaction.isCommand()) return;
        const command = instance.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            }catch (error) {
                if(interaction.deferred || interaction.replied) {
                    interaction.editReply("There was an error while executing this command!")
                } else {
                    interaction.reply("There was an error while executing this command!")
                }
            }
        }
      });
    };
  }

  async LoadCommands() {
    const commandFiles = fs.readdirSync(`./commands`).filter((file) => file.endsWith(`.js`));
    for (const commandFile of commandFiles) {
        const command = await import(`../commands/${commandFile}`);
        this.instance.commands.set(command.data.name, command);
    }
  }
};
