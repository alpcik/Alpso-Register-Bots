const nameData = require("../../RegisterDatabase/names")
const conf = require("../../Settings/RoleSettings.json")
const {red} = require("../../Settings/emojidb.json")
const moment = require("moment")
moment.locale("tr")
module.exports = {
  conf: {
    aliases: [],
    name: "isimler",
    help: "isimler [kullanıcı]"
  },
  run: async (client, message, args, embed, prefix) => { 
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
      message.react(red)
    message.lineReply(`Bu işlemi yapabilmek için kayıt yetkilisi olman gerekli!`).then(x=> x.delete({timeout: 5000})) 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const data = await nameData.findOne({ guildID: message.guild.id, userID: member.user.id });

    embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }));
    embed.setTitle(`${member.user.username} üyesinin isim bilgileri;`);
    message.lineReply(embed.setDescription(data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) , (<@${x.yetkili}>)**`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!"));
  }
};
