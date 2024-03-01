const { MessageEmbed } = require("discord.js");
const client = global.client;
const conf = require("../Settings/RoleSettings.json");
const log = require("../Settings/ChannelSettings.json")
const settings = require("../Settings/GuildSettings.json")
module.exports = async (oldUser, newUser) => {
    if (oldUser.bot || newUser.bot || (oldUser.username === newUser.username)) return;
    const guild = client.guilds.cache.get(settings.guildID);
    if (!guild) return;
    const member = guild.members.cache.get(oldUser.id);
    if (!member) return;
    const channel = guild.channels.cache.get(log.TagLogChannel);
    const kanal = guild.channels.cache.get(log.chatChannel)
    if (oldUser.username.includes(conf.tag) && !newUser.username.includes(conf.tag)) {
      if (member.manageable && member.displayName.includes(conf.tag)) member.setNickname(member.displayName.replace(conf.tag, conf.ikinciTag));
      if (conf.taglıAlım && !member.premiumSince) member.roles.set(conf.unregister);
      else member.roles.remove(conf.ekipRolu);
      if (!channel) return;
      const embed = new MessageEmbed()
        .setAuthor(member.displayName,  newUser.displayAvatarURL({ dynamic: true }))
        .setTitle("• Bir kullanıcı tag saldı!")
        .setColor("RED")
        .setDescription(`
${member.toString()} kullanıcısı ${conf.tag} tagını saldığı için <@&${conf.ekipRolu}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size}
         `);
      channel.wsend(embed);
      } else if (!oldUser.username.includes(conf.tag) && newUser.username.includes(conf.tag)){
      if (member.manageable) member.setNickname(member.displayName.replace(conf.ikinciTag, conf.tag));
      member.roles.add(conf.ekipRolu);
      if (!channel) return;
      const embed = new MessageEmbed()
        .setAuthor(member.displayName, newUser.displayAvatarURL({ dynamic: true }))
        .setTitle("• Bir kullanıcı tag aldı!")
        .setColor("RED")
        .setDescription(`
${member.toString()} kullanıcısı ${conf.tag} tagını aldığı için <@&${conf.ekipRolu}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size}
    `);
      channel.wsend(embed);
      kanal.wsend(new MessageEmbed().setColor("RED").setDescription(`${member.toString()} üyesi ${conf.tag} tagımızı alarak ailemize katıldı! Ailemiz ${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size} kişi oldu!`)).then(x=>x.delete({timeout: 5000}))

    }
  
  
};

module.exports.conf = {
  name: "userUpdate",
};
