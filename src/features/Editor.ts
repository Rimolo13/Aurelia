import { Client, Message } from "discord.js";

export class Editor {
  constructor(instance: Client) {
    instance.on("messageCreate", (message: Message) => {
      if (message.channel.id === "1333038924909645866" && !message.author.bot) {
        const blodText = this.boldingText(message);

        if (message.channel.isSendable()) {
          message.channel.send(blodText);
        }
      }
    });
  }

  boldingText(message: Message) {
    const petternOriginal = [
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    ];
    const petternResult = [
      ..."𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
    ];

    const petterUmlauteOriginal = ["Ä", "Ö", "Ü", "ä", "ö", "ü", "ß"];
    const petterUmlauteResult = ["𝗔𝗲", "𝗢𝗲", "𝗨𝗲", "𝗮𝗲", "𝗼𝗲", "𝘂𝗲", "𝘀𝘀"];

    let result = message.content;
    result = this.replacePettern(result, petternOriginal, petternResult);
    result = this.replacePettern(
      result,
      petterUmlauteOriginal,
      petterUmlauteResult
    );

    return result;
  }

  replacePettern(
    content: string,
    petternOriginal: string | string[],
    petternResult: string | string[]
  ) {
    let result = content;
    for (let i = 0; i < petternOriginal.length; i++) {
      result = result.replaceAll(petternOriginal[i], petternResult[i]);
    }
    return result;
  }

  destroy() {}
}
