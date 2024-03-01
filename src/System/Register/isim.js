const ayar = require("../../Settings/RoleSettings.json")
const Ayarlar = require("../../Settings/RoleSettings.json");
const log = require("../../Settings/ChannelSettings.json")
const {red,green} = require("../../Settings/emojidb.json")
const isimler = require("../../RegisterDatabase/names");
const moment = require("moment")
moment.locale("tr")


module.exports = {
  conf: {
    aliases: ["isim", "i", "nick"],
    name: "isim",
    help: "isim [üye] [isim] [yaş]"
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
message.react(green)
message.lineReply(`${red} Hatalı Kullanım \`\`@Alpso/ID\`\` İsim Yaş`).then(x=>x.delete({timeout:5000})) 
return }
if(message.author.id === uye.id) 
{
message.react(red)
message.lineReply(`${red} Hatalı Kullanım Kendi ismini değiştiremezsin. Booster isen .zengin `).then(x => x.delete({timeout: 5000})); 
return }
if(!uye.manageable) 
{
message.react(red)
message.lineReply(`${red} Hatalı Kullanım  Böyle birisinin ismini değiştiremiyorum. [HATA!]`).then(x => x.delete({timeout: 5000})); 
return }
if(message.member.roles.highest.position <= uye.roles.highest.position) 
{
message.react(red)
message.lineReply(`${red} Hatalı Kullanım Senden yüksekte olan birisinin ismini değiştiremezsin. [HATA!]`).then(x => x.delete({timeout: 5000})); 
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
if(!yaş) 
{ setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
} else { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
} uye.setNickname(`${setName}`).catch(err => message.lineReply(`${red} Hatalı Kullanım : İsimi çok uzun girdin. `))
message.react(green)
message.lineReply(embed.setColor("RED").setDescription(`
${uye.toString()} Kullanıcının "${setName}" olarak yapıldı.`)
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 })))
if(log.registerLogChannel && client.channels.cache.has(log.registerLogChannel)) client.channels.cache.get(log.registerLogChannel).send( embed.setColor("RED").setDescription(`
${uye.toString()} üyesinin ismi başarıyla ${setName} olarak değiştirildi!`));
await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: setName, yetkili: message.author.id,  rol: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });
}}
