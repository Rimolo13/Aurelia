import { ChatInputCommandInteraction ,Client, Interaction} from "discord.js";
import fs from "fs";

export class LoadCommands {
  instance: Client;
  commands: Map<string, any> = new Map();
  constructor(instance: Client) {
    this.instance = instance;
    if (fs.existsSync("./commands")) {
        this.LoadCommands();

      instance.on("interactionCreate", async (interaction: Interaction) => {
          if (!interaction.isCommand()) return;
          const commandinteraction = interaction as ChatInputCommandInteraction;
          const command = this.commands.get(commandinteraction.commandName);
          if (command) {
            try {
              await command.execute(commandinteraction);
            } catch (error) {
              if (commandinteraction.deferred || commandinteraction.replied) {
                commandinteraction.editReply(
                  "There was an error while executing this command!"
                );
              } else {
                commandinteraction.reply(
                  "There was an error while executing this command!"
                );
              }
            }
          }
      });
    };
  }

  async LoadCommands() {
    const commandFiles = fs.readdirSync(`./commands`).filter((file) => file.endsWith(`.js`));
    for (const commandFile of commandFiles) {
        const command = (await import(`../commands/${commandFile}`)).default;
        this.commands.set(command.data.name, command);
    }
  }
};
