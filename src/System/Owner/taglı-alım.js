const Discord = require("discord.js");
const registerData  = require("../../RegisterDatabase/registerStats");
const {green,red} = require("../../Settings/emojidb.json")

module.exports = {
    conf: {
      aliases: ["taglıalım","taglı-alım"],
      name: "taglı-alım",
      help: "taglı-alım [aç/kapat]",
      owner: true,
    },

  run: async (client, message, args, embed) => {
    message.react(red)

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(embed
      .setColor("RED")
      .setDescription(`${red} Hata : ${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
    let data = await registerData.findOne({ guildID: message.guild.id })
    if(!data) new registerData({guildID: message.guild.id, tagMode: false}).save();
    switch (args[0]) {
        case "aç":
            if (data && data.tagMode === true) return message.lineReply(embed.setColor("RANDOM").setDescription(`${red} Taglı Alım Açıkmış Zaten`))
            data.tagMode = true; 
            data.save();
            message.lineReply(embed.setColor("RANDOM").setDescription(`${green} Taglı Alım Modu Aktifleştirildi.\nkapatmak için; .taglı-alım kapat`))
            message.react(green)

            break;
        case "kapat":
            if (data && data.tagMode === false) return message.lineReply(embed.setColor("RANDOM").setDescription(`${green} Taglı Alım Modu Kapatıldı.\naçmak İçin; .taglı-alım aç`))
            data.tagMode = false;

            data.save();
            message.lineReply(embed.setColor("RANDOM").setDescription(`${green} taglı alım modu başarıyla deaktif edildi!`))
            message.react(green)

            break;
        default:
          message.lineReply(embed.setColor("RANDOM").setDescription(`${red} Hatalı kullanım! \`\`!taglıalım aç/kapat\`\``));
            break;
    }
}
}