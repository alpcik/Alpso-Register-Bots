const { MessageEmbed, Client } = require('discord.js');
const conf = require("../../Settings/RoleSettings.json")
const ayar = require("../../Settings/RoleSettings.json")
const toplams = require("../../RegisterDatabase/toplams");
const log = require("../../Settings/ChannelSettings.json")
const Ayarlar = require("../../Settings/RoleSettings.json");
const {red,green} = require("../../Settings/emojidb.json")
const settings = require("../../Settings/GuildSettings.json")
const isimler = require("../../RegisterDatabase/names");
const regstats = require("../../RegisterDatabase/registerStats");
const otokayit = require("../../RegisterDatabase/otokayit");
const moment = require("moment")
moment.locale("tr")
const { MessageButton } = require('discord-buttons');


module.exports = {
  conf: {
    aliases: ["kayit", "kayıt","k","e"],
    name: "kayıt",
    help: "kayıt [üye] [isim] [yaş]"
  },
run: async (client, message, args, embed, prefix) => { 
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Ayarlar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
      message.react(red)
    message.lineReply(`${red} Bu işlemi yapabilmek için kayıt yetkilisi olman gerekli!`).then(x=> x.delete({timeout: 5000})) 
    return }
    if(!uye) 
    {
      message.react(red)
    message.lineReply(`${red} Hatalı Kullanım : \`\`@Alpso/ID\`\` İsim Yaş`).then(x=>x.delete({timeout:5000})) 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.lineReply(`${red} Hatalı Kullanım : Kendini kayıt edemezsin.`).then(x => x.delete({timeout: 5000})); 
    return }
    if(!uye.manageable) 
    {
      message.react(red)
    message.lineReply(`${red} Hatalı Kullanım : Böyle birisini kayıt edemiyorum.`).then(x => x.delete({timeout: 5000})); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
      message.react(red)
    message.lineReply(`${red} Hatalı Kullanım : Senden yüksekte olan birisini kayıt edemezsin.`).then(x => x.delete({timeout: 5000})); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react(red)
    message.lineReply(`${red} Hatalı Kullanım \`\`@Alpso/ID\`\` İsim Yaş`).then(x=>x.delete({timeout:5000})) 
    return }

   const tagModedata = await regstats.findOne({ guildID: message.guild.id })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!uye.roles.cache.has("") && !uye.roles.cache.has(ayar.vipRole) && !uye.roles.cache.has(ayar.boosterRolu)) return message.lineReply(embed.setColor("RED").setDescription(`${uye.toString()} isimli üyenin kullanıcı adında tagımız  olmadığı, <@&${ayar.boosterRolu}>, <@&${ayar.vipRole}>, <@&${ayar.ekipRolu}> Rolü olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`));
    }

    if(!yaş) 
    { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
    } else { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  }
    uye.setNickname(`${setName}`).catch(err => message.lineReply(`${red} Hatalı Kullanım : İsim çok uzun.`))
    const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });

    if(!uye.roles.cache.has(Ayarlar.erkekRolleri) && !uye.roles.cache.has(Ayarlar.kizRolleri)) {
    var ManButton = new MessageButton().setID("MAN").setLabel("Erkek").setStyle("blurple")
    var WomanButton = new MessageButton().setID("WOMAN").setLabel("Kız").setStyle("green")
    var KayitsizButton = new MessageButton().setID("KAYİTSİZ").setLabel("İptal").setStyle("red")

    let erkekRol = conf.erkekRolleri;
    let kadinRol = conf.kizRolleri;

    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });

    message.react(green)
    let alp = new MessageEmbed().setColor("RANDOM").setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true })).setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 })).setDescription(`${uye.toString()} üyesinin ismi "${setName}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.`).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
   
 let msg = await message.channel.send({ buttons : [ ManButton, WomanButton, KayitsizButton ], embed: alp})
    var filter = (button) => button.clicker.user.id === message.author.id;
  
    let collector = await msg.createButtonCollector(filter, { time: 30000 })
collector.on("collect", async (button) => {
if(button.id === "MAN") {
await button.reply.defer()
let alpe = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true }))
.setDescription(`${uye.toString()} sunucumuza <@${message.author.id}> yetkilimiz tarafından, \`${setName}\` bu kullanıcıya bu ismiyle ${conf.erkekRolleri.length > 1 ? conf.erkekRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.erkekRolleri.map(x => `<@&${x}>`).slice(-1) : conf.erkekRolleri.map(x => `<@&${x}>`).join("")} erkek rollerini vererek kaydını başarılı bir şekilde tamamladı.`)
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))

msg.edit({components: null, embed: alpe}); 

    await uye.roles.add(ayar.erkekRolleri)
    await uye.roles.remove(ayar.kizRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await uye.roles.remove(ayar.fakeAccRole)
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: conf.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });

if(log.chatChannel && client.channels.cache.has(log.chatChannel)) client.channels.cache.get(log.chatChannel).send(`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`).then(x => x.delete({timeout: 10000})) 
if(log.registerLogChannel && client.channels.cache.has(log.registerLogChannel)) client.channels.cache.get(log.registerLogChannel).send( embed.setColor("RED").setDescription(`${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${conf.erkekRolleri.length > 1 ? conf.erkekRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.erkekRolleri.map(x => `<@&${x}>`).slice(-1) : conf.erkekRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi!`));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: erkekRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

}

if(button.id === "WOMAN") {
await button.reply.defer()
let alpk = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true }))
.setDescription(`
${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${conf.kizRolleri.length > 1 ? conf.kizRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.kizRolleri.map(x => `<@&${x}>`).slice(-1) : conf.kizRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi! 
`)
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))

msg.edit({components: null, embed: alpk}); 

    await uye.roles.add(ayar.kizRolleri)
    await uye.roles.remove(ayar.erkekRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await uye.roles.remove(ayar.fakeAccRole)
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id,  rol: conf.kizRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });


if(log.chatChannel && client.channels.cache.has(log.chatChannel)) client.channels.cache.get(log.chatChannel).send(`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`).then(x => x.delete({timeout: 10000})) 
if(log.registerLogChannel && client.channels.cache.has(log.registerLogChannel)) client.channels.cache.get(log.registerLogChannel).send( embed.setColor("RED").setDescription(`${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${conf.kizRolleri.length > 1 ? conf.kizRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.kizRolleri.map(x => `<@&${x}>`).slice(-1) : conf.kizRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi! `));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: kadinRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

}

if(button.id === "KAYİTSİZ") {
msg.edit(`${green} **Başarılı :** Kayıt İşleminiz Başarılı Bir Şekilde İptal Edilmiştir Üye Kayıtsıza Geri Atılmıştır.`,{components: null}); 
uye.setNickname(`• İsim | Yaş`)
await uye.roles.add(ayar.unregRoles)
await uye.roles.remove(ayar.kizRolleri)
await uye.roles.remove(ayar.erkekRolleri)
}

   });

  }
}   
}
