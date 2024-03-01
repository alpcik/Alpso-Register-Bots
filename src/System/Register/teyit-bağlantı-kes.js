const Discord = require("discord.js")
const {red,green} = require("../../Settings/emojidb.json")
const log = require("../../Settings/ChannelSettings.json")
const ayar = require("../../Settings/RoleSettings.json")

module.exports = {
  conf: {
    aliases: ["kes","bağlantı-kes","at"],
    name: "Bağlantı-Kes",
    help: "Bağlantı-Kes"
  },

  run: async (client, message, args, embed, prefix) => { 
    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return; 

       const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) 
       {
        message.react(red)
       message.lineReply(`${red} Hatalı Kullanım  \`\`.kes @Alpso/ID\`\``).then(x=>x.delete({timeout:5000})) 
        return }
        if(!member.voice.channel) return message.lineReply("Bağlantısını kesmek istediğiniz kullanıcı sesli odalarda bulunmuyor.", message.author, message.channel)
        if(message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return message.lineReply("Rolleri senden yüksek birinin ses kanallarında ki bağlantısını kesemezsin.", message.author, message.channel)
        if(log.registerLogChannel && client.channels.cache.has(log.registerLogChannel)) client.channels.cache.get(log.registerLogChannel).send( embed.setColor("RED").setDescription("<@"+member+"> adlı kişinin <#"+member.voice.channel.id+"> adlı ses kanalından çıkarıldı."));
        const SesntenCikti = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("<@"+member+"> adlı kişinin <#"+member.voice.channel.id+"> adlı ses kanalından çıkarıldı.")
        .setColor("RED")
        member.voice.kick()
        message.lineReply(SesntenCikti).then(message => { message.delete({ timeout : 7500 }) }).then(m => message.react(green))  
  },
};
