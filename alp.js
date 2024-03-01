const { Client, Collection, Discord, MessageEmbed } = require("discord.js");
require("discord-reply")
const client = global.client = new Client({fetchAllMembers: true});
require('discord-buttons')(client)
const settings = require("./src/Settings/GuildSettings.json");
const logs = require("./src/Settings/ChannelSettings.json");
const tags = require("./src/Settings/RoleSettings.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();
fs.readdir('./src/System/', (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    fs.readdir("./src/System/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/System/${f}/` + file);
        console.log(`[CMD] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  client.on('voiceStateUpdate', async (___, newState) => {
    if (
    newState.member.user.bot &&
    newState.channelID &&
    newState.member.user.id == client.user.id &&
    !newState.selfDeaf
       ) {
    newState.setSelfDeaf(true);
       }
       });

  client.on("userUpdate", async function(oldUser, newUser) {
    const guildID = `${settings.guildID}`
    const roleID = `${tags.ekipRolu}`
    const Tag = `${tags.tag}`
    const Etiket =`${tags.EtiketTag}`
    const TagLog = `${logs.TagLogChannel}`
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new MessageEmbed()
    .setColor('RED')
    .setTimestamp()
    .setFooter('Developed By Alpso.');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(Tag) && !newUser.username.includes(Tag)) {
            member.roles.remove(roleID)
            if (oldUser.discriminator !== "☨" && newUser.discriminator == "☨") {
                member.roles.add(roleID) }
            client.channels.cache.get(TagLog).send(embed.setDescription(` ${newUser} isminden \`☨\` çıkartarak ailemizden ayrıldı!`))
        } if (!oldUser.username.includes(Tag) && newUser.username.includes(Tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(TagLog).send(embed.setDescription(`  ${newUser} ismine \`☨\` alarak ailemize katıldı`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == Etiket && newUser.discriminator !== Etiket) {
            member.roles.remove(roleID)
            if (!oldUser.username.includes(Etiket) && newUser.username.includes(Etiket)) {
                member.roles.add(roleID) }
            client.channels.cache.get(TagLog).send(embed.setDescription(`  ${newUser} etiketinden \`${Etiket}\` çıakrtarak ailemizden ayrıldı!`))
        } if (oldUser.discriminator !== Etiket && newUser.discriminator == Etiket) {
            member.roles.add(roleID)
            client.channels.cache.get(TagLog).send(embed.setDescription(`  ${newUser} etiketine \`${Etiket}\` alarak ailemize katıldı`))
        }
    }
  
  })

 
