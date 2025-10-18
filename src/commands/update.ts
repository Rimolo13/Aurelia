import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { exec } from "child_process";

const command = {
    data: new SlashCommandBuilder().setName("update").setDescription("update the bot"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("🔄 Updating...");
        exec("cd ../ && mkdir -p temp && cp -r ./configuration/* ./temp && git reset --hard HEAD && git pull && cp -r ./temp/* ./configuration && npm install && cp ./package.json ./dist && npx tsc && cd ./dist && npm install && clear");
    },
};

export default command;