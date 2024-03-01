const regstats = require("../../RegisterDatabase/registerStats");
const {red,green,miniicon} = require("../../Settings/emojidb.json")
const ayar = require("../../Settings/RoleSettings.json")
module.exports = {
  conf: {
    aliases: [],
    name: "stat",
    help: "stat"
  },
  run: async (client, message, args, embed, prefix) => { 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
      message.react(red)
    message.lineReply(`${red} Bu işlemi yapabilmek için kayıt yetkilisi olman gerekli!`).then(x=> x.delete({timeout: 5000})) 
    return }
    if (args[0] === "top") {
      let registerTop = await regstats.find({ guildID: message.guild.id }).sort({ top: -1 });

      if (!registerTop.length) 
      {
        message.react(red)
      message.lineReply(`${red} Hatalı Kullanım : Herhangi bir kayıt verisi bulunamadı!`).then(x=>x.delete({timeout:5000})) 
      return }
      registerTop = registerTop.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 30);
      message.react(green)
      message.lineReply(embed.setDescription((registerTop.map((x, i) => `\`${i + 1}.\` <@${x.userID}> - Erkek __${x.erkek}__ Kadın __${x.kız}__`))))
    } else if (!args[0]) {
      const data = await regstats.findOne({ guildID: message.guild.id, userID: member.id });
      message.react(green)
      message.lineReply(embed
        .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048}))
        .setColor("RED")
        .setDescription(`  
${miniicon} Toplam kayıt bilgisi: \`${data ? data.top : 0}\`
${miniicon} erkek kayıt bilgisi: \`${data ? data.erkek : 0}\`
${miniicon} kız kayıt bilgisi: \`${data ? data.kız : 0}\`
	`));
    }
  },
};
