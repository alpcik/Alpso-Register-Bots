const reload = require('../../RegisterDatabase/reload.js');
const {tac} = require("../../Settings/emojidb.json")

module.exports = {
    conf: {
        aliases: [ "restart"],
        name: "restart",
        help: "restart"
      },


      run: async (client, message, args, embed, prefix) => {
       
        await message.lineReply(`${tac} **Botunuz Yeniden Başlatılıyor...**`).then(async msg => {

            console.log('[BOT] Started to reload');
            await new reload({ type: 'registery', authorID: message.author.id, channelID: msg.channel.id, messageID: msg.id }).save();

        });

        process.exit();

    },
};