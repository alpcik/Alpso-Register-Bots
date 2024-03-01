const ayar = require("../../Settings/GuildSettings.json")
const moment = require("moment");
moment.locale("tr");
const { red } = require("../../Settings/emojidb.json")
module.exports = {
  conf: {
    aliases: ["regyetkili","reg-yetkili-say","regyetkili"],
    name: "regyetkili",
    help: "regyetkili"
  },
run: async (client, message, args, embed) => {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(red)
let NoVoice = message.guild.members.cache.filter(Tau => Tau.roles.cache.has(ayar.registerPerm)).filter(filterTau => !filterTau.voice.channel&&filterTau.presence.status!="offline")
message.lineReply(`
Registery Permi Olan Yetkililerimiz
${NoVoice.map(noVoiceMember => `${noVoiceMember}  (${noVoiceMember.user.tag})`).join('\n')}`)
}}
