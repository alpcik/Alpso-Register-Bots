const Discord = require("discord.js");
const {green,miniicon} = require("../../Settings/emojidb.json");
const conf = require("../../Settings/RoleSettings.json")

module.exports = {
  conf: {
    aliases: [],
    name: "rolsüz",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    let rolsüz = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    if(args[0] == "ver") {
      rolsüz.forEach(r => {
    r.roles.add(conf.unregRoles)
    })
    message.lineReply(embed
      .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))

      .setColor("RED")
    .setDescription(`
${miniicon} Sunucuda rolü olmayan kişiyelere kayıtsız rolü verildi!
\`\`\`diff
- `+ rolsüz.size +`
\`\`\`${miniicon} Başarılı Bir Şekilde Roller Dagıtıldı Kolay Gelsin
    `))
    message.react(green)
    } else if(!args[0]) {
      message.lineReply(embed
        .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))

        .setColor("RED")
    .setDescription(`${miniicon} Sunucumuzda rolü olmayan \``+ rolsüz.size +`\` kişi var.
\`\`\`diff
- `+ rolsüz.size +`
\`\`\` ${miniicon}Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` Kullan!`))    
}
  },
};
 