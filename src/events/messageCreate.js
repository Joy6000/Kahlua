const { EventType, eventModule } = require("@sern/handler");

exports.default = eventModule({
    name: "messageCreate",
    type: EventType.Discord,
    async execute(message) {
        if(message.author.bot) return
        
        try {
            const { GuildSettings } = require("../models.sql");


            const guildS = await GuildSettings.findOne({where: {id: message.guildId}});
            if (!guildS || guildS && !guildS.get("messageCounts")) return;
            if (guildS && guildS.messageCounts) {
                const { MessageCounts } = require("../models.sql");
                const msgCount = await MessageCounts.findOne({ where: { guildId: message.guildId, userId: message.author.id } });
                if (!msgCount) {
                    const newMsgCount = await MessageCounts.create({id: generateRandomNumber(), userId: message.author.id, guildId: message.guildId, count: 1});
                    await newMsgCount.save();
                } else {
                    msgCount.count += 1;
                    await msgCount.save();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
})



function generateRandomNumber () {
    return Math.floor(Math.random() * 99999999999999)
}