const moment = require("moment");
const {star} = require("../../Settings/emojidb.json")
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
module.exports = {
    conf: {
        name: 'girişbilgi',
        aliases: ['günlükinfo', 'gi', 'gi', 'günlükinfo'],
        category: 'Admin',
        usage: '',
        permission: 'ADMINISTRATOR',
        guildOnly: true, 
        cooldown: 5,
    },
  
run: async (client, message, args, embed, prefix) => {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
let age15 = message.guild.members.cache.filter(member => member.displayName.includes('15'));
let age16 = message.guild.members.cache.filter(member => member.displayName.includes('16'));
let age17 = message.guild.members.cache.filter(member => member.displayName.includes('17'));
let age18 = message.guild.members.cache.filter(member => member.displayName.includes('18'));
let age19 = message.guild.members.cache.filter(member => member.displayName.includes('19'));
let age20 = message.guild.members.cache.filter(member => member.displayName.includes('20'));

var AdminKomutlar = new MessageButton()
.setID("AdminKomutlar")
.setLabel("Sunucu Yaş Ortalaması")
.setStyle("green")
.setEmoji("952214679357374545")

var YetkiliKomutları = new MessageButton()
.setID("YetkiliKomutları")
.setLabel("Üye Giriş Ortalaması")
.setStyle("green")
.setEmoji("952214679357374545")

const row = new MessageActionRow()
.addComponent(AdminKomutlar)
.addComponent(YetkiliKomutları)


embed
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`${star} Sunucumuzun Yaş Ortalaması Aşagıda Bulunmaktadır Net Bir Şekilde Veriler verilmiştir dikkatli okuyunuz iyi günler`)
.addFields(
  { name: "Sunucudaki yaş ortalaması;",  value: `
\`\`\`diff
- Sunucuda  15'da olan toplam ${age15.size} kişi bulunuyor
- Sunucuda  16'da olan toplam ${age16.size} kişi bulunuyor
- Sunucuda  17'da olan toplam ${age17.size} kişi bulunuyor
- Sunucuda  18'da olan toplam ${age18.size} kişi bulunuyor
- Sunucuda  19'da olan toplam ${age19.size} kişi bulunuyor
- Sunucuda  20'da olan toplam ${age20.size} kişi bulunuyor

\`\`\`
`, inline: true }
)
let msg = await message.channel.send({ buttons : [AdminKomutlar,YetkiliKomutları], embed: embed})
var filter = (button) => button.clicker.user.id === message.author.id;

let collector = await msg.createButtonCollector(filter, { time: 99999999 })
collector.on("collect", async (button) => {

if(button.id === "YetkiliKomutları") {
await button.reply.defer()
const embeds = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`${star} Sunucudaki tüm giriş ortalaması burada dikkatlice bakınız Bütün Netleri Aşagıda İyi günler`)
.addFields(
  { name: "Sunucudaki Giriş Ortalaması;",  value: `
\`\`\`diff
- son \`1 saatte\` toplam ${message.guild.members.cache.filter(member => (Date.now() - member.joinedTimestamp) < 3600000).size} üye giriş yaptı
- son \`1 günde\` toplam ${message.guild.members.cache.filter(member => (Date.now() - member.joinedTimestamp) < 86400000).size} üye giriş yaptı
- son \`1 haftada\` toplam ${message.guild.members.cache.filter(member => (Date.now() - member.joinedTimestamp) < 604800000).size} üye giriş yaptı
- son \`1 ayda\` toplam ${message.guild.members.cache.filter(member => (Date.now() - member.joinedTimestamp) < 2592200000).size} üye giriş yaptı

\`\`\`
`, inline: true }
)
msg.edit({
embed: embeds,
components : row
})}

if(button.id === "AdminKomutlar") {
await button.reply.defer()
msg.edit({
embed: embed,
components : row
})}
})
},
};  