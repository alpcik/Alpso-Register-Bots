const client = global.client;
const inviterSchema = require("../RegisterDatabase/inviter");
const inviteMemberSchema = require("../RegisterDatabase/inviteMember");
const conf = require("../Settings/RoleSettings.json")
const {konfeti,red} = require("../Settings/emojidb.json")
const log = require("../Settings/ChannelSettings.json")
module.exports = async (member) => {
  const channel = member.guild.channels.cache.get(log.invLogChannel);
  if (!channel) return;
  if (member.user.bot) return;

  const inviteMemberData = await inviteMemberSchema.findOne({ guildID: member.guild.id, userID: member.user.id });
  if (!inviteMemberData) {
    channel.wsend(`

    ${red} <@${member.user.id}> Sunucumuzdan ayrıldı ama kim tarafından davet edildiğini bulamadım

    `);
  } else {
    const inviter = await client.users.fetch(inviteMemberData.inviter);
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: inviter.id, });
    const total = inviterData ? inviterData.total : 0;
    channel.wsend(`

    ${red} <@${member.user.id}> Sunucumuzdan ayrıldı. ${inviter.tag} Tarafından davet edilmişti. ${total} daveti kaldı

    `);
  }
};

module.exports.conf = {
  name: "guildMemberRemove",
};