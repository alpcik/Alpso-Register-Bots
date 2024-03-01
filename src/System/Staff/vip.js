const { red , green} = require("../../Settings/emojidb.json")
const conf = require("../../Settings/RoleSettings.json")
const log = require("../../Settings/ChannelSettings.json")

module.exports = {
  conf: {
    aliases: ["vip","special"],
    name: "vip",
    help: "vip",
  },

  run: async (client, message, args, embed, prefix) => {
if (!message.member.hasPermission("ADMINISTRATOR") &&  !conf.VipHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send("Bu işlemi yapabilmek için kayıt yetkilisi olman gerekli!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
const user =message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!user) { message.channel.send(`${red} Hatalı Kullanım : Böyle bir kullanıcı bulunamadı!`).then(x=>x.delete({timeout:5000}))
message.react(red)
return }
if(!user.roles.cache.has(conf.vipRole)) 
{
user.roles.add(conf.vipRole)
if(log.registerLogChannel && client.channels.cache.has(log.registerLogChannel)) client.channels.cache.get(log.registerLogChannel).send( embed
  .setColor("RED")
  .setDescription(`${green} Başarılı! ${user} kişisine başarılı bir şekilde <@&${conf.vipRole}> rolü verildi!`)
  );

message.lineReply(`${green} Başarılı! ${user} kişisine başarılı bir şekilde <@&${conf.vipRole}> rolü verildi!`).then(x=>x.delete({timeout:5000}))
} else {
user.roles.remove(conf.vipRole)
message.lineReply(`${green} Başarılı! ${user} kişisinden başarılı bir şekilde <@&${conf.vipRole}> rolü alındı!`).then(x=>x.delete({timeout:5000}))
if(log.registerLogChannel && client.channels.cache.has(log.registerLogChannel)) client.channels.cache.get(log.registerLogChannel).send( embed
.setColor("RED")
.setDescription(`${green} Başarılı! ${user} kişisinden başarılı bir şekilde <@&${conf.vipRole}> rolü alındı!`)
);

}
}
};