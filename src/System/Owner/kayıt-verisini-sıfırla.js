const moment = require("moment");
const name = require("../../RegisterDatabase/names");
const penals = require("../../RegisterDatabase/penals");
require("moment-duration-format");
const {red,green} = require("../../Settings/emojidb.json")
const conf = require("../../Settings/RoleSettings.json");
const log = require("../../Settings/ChannelSettings.json")
const { TeamMember, MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
module.exports = {
  conf: {
    aliases: ["sf","sıfırla"],
    name: "sıfırla",
    help: "sıfırla"
  },
  run: async (client, message, args, embed) => {

if (!message.member.hasPermission('ADMINISTRATOR'))
{
message.lineReply(`${red} Hata : Yetkiniz Bulunmuyor Lütfen Komutu Kullanmayınız!`).then(x=>x.delete({timeout: 5000}))
message.react(red)
return;
}
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    var DeleteName = new MessageButton()
    .setLabel(`İsmi Sıfırla`)
    .setID("isim_sıfırla")
    .setStyle("green")
    const row = new MessageActionRow()
    .addComponents(DeleteName)
embed
.setColor("RANDOM")
.setDescription(`${member.toString()} Adlı Kullanıcının İsmini Sıfırlamak İçin Aşagıdaki Buttona Tıklayabilirsiniz.`)
message.react(green)

    let msg = await message.channel.send(embed, { components: [row] });
    var filter = (button) => button.clicker.user.id === message.author.id;
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {
      if(button.id === "isim_sıfırla") {
      let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      if (üye.user.bot) return;
      if(log.registerLogChannel && client.channels.cache.has(log.registerLogChannel)) client.channels.cache.get(log.registerLogChannel).send( embed.setDescription(` ${member.toString()} Kullanıcının Bu Zamana Kadar Kayıtlı Oldugu Bütün İsim Geçmişi ${message.author} Yetkili tarafından \`${moment(Date.now()).format("LLL")}\`  bu tarihde başarılı bir şekilde verilerimden silindi.`));
      await button.reply.defer()
      await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new MessageEmbed()
      .setThumbnail(üye.user.avatarURL({ dynamic: true }))
      .setAuthor(üye.displayName, üye.user.avatarURL({ dynamic: true }))
      .setColor("RANDOM")
      .setDescription(` ${member.toString()} Kullanıcının Bu Zamana Kadar Kayıtlı Oldugu Bütün İsim Geçmişi ${message.author} Yetkili tarafından \`${moment(Date.now()).format("LLL")}\`  bu tarihde başarılı bir şekilde verilerimden silindi.`)
      msg.edit({
  embed : isim,
  components : null
})}
})}};
