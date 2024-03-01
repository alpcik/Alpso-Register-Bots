const client = global.client;
const conf = require("../Settings/RoleSettings.json");
const settings = require("../Settings/GuildSettings.json")
const log = require("../Settings/ChannelSettings.json")
const penals = require("../RegisterDatabase/penals");
const {MessageEmbed} = require("discord.js")
module.exports = async () => {
  client.guilds.cache.forEach(async (guild) => {
    const invites = await guild.fetchInvites();
    client.invites.set(guild.id, invites);
  });

let botVoiceChannel = client.channels.cache.get(log.BotVoiceChannel); 
if (botVoiceChannel) 
botVoiceChannel.join().then(console.log(`Bot ses kanalına bağlandı!`)).catch(err => console.error("[HATA] Bot ses kanalına bağlanamadı!"));
client.user.setPresence({ activity: { name: settings.botStatusText}, status: settings.status });
client.guilds.cache.get(settings.guildID).members.cache.filter(uye => uye.user.username.includes(conf.tag) && !uye.user.bot && !uye.roles.cache.has(conf.boosterRolu) && (!uye.roles.cache.has(conf.ekipRolu) || !uye.displayName.startsWith(conf.tag))).array().forEach((uye) => {
setTimeout(() => {
uye.setNickname(uye.displayName.replace(conf.ikinciTag, conf.tag));
if (conf.ekipRolu) uye.roles.add(conf.ekipRolu).catch({ })
}, 1000 * 60 * 60);
})
};


module.exports.conf = {
  name: "ready",
};