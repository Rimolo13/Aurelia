import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { exec } from "child_process";

const command = {
    data: new SlashCommandBuilder().setName("update").setDescription("update the bot"),
    execute(interaction: ChatInputCommandInteraction) {
        exec("cd ../ && mkdir -p temp && cp -r ./configuration/* ./temp && git reset --hard HEAD && git pull && cp -r ./temp/* ./configuration && npm install && cp ./package.json ./dist && npx tsc && cd ./dist && npm install && clear",
            async (error: Error | null) => {
        if (error) {
          await interaction.reply(`❌ Error: ${error.message}`);
          return;
        } else {
          await interaction.reply(`✅ Update & Build successfully!`);
        }
      });
    },
};

export default command;