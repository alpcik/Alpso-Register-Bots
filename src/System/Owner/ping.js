const {star} = require("../../Settings/emojidb.json")

module.exports = {
    conf:{
        name: 'ping',
    aliases: [],
    category: 'Developer',
    help:"ping",
    developer: true
    },
    run: async (client, message) => {     
        message.lineReply(`Botunuzun Pingi Hesaplarınıyor...`).then(msg => {

            msg.edit(`
${star} Discord Gecikmesi : **${client.ws.ping} ms**
${star} Mesaj Gecikmesi : **${msg.createdTimestamp - message.createdTimestamp} ms**
            `);

        });

    },
};