const conf = require("../Settings/RoleSettings.json")
const pref = require("../Settings/GuildSettings.json")

module.exports = async (message) => {
  if (message.content.toLowerCase() === `${pref.prefix}tag`) {
    message.react("✅");
    message.lineReply(`\`\`${conf.tag}\`\``);
  }
};
module.exports.conf = {
  name: "message"
};
