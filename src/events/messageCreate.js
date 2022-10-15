const { EventType, eventModule } = require("@sern/handler");
exports.default = eventModule({
    name: "messageCreate",
    type: EventType.Discord,
    async execute(message) {
        if(message.author.bot) return;
        try {
            const { GuildSettings } = require("../models.sql");


            const guildS = await GuildSettings.findOne({where: {id: message.guildId}});
            if (!guildS || guildS && !guildS.get("messageCounts")) return;
            if (guildS && guildS.messageCounts) {
                const { MessageCounts } = require("../models.sql");
                const msgCount = await MessageCounts.findOne({ where: { id: message.author.id } });

                if (!msgCount) {
                    const newMsgCount = await MessageCounts.create({id: message.author.id, count: 1});
                    await newMsgCount.save();
                } else {
                    msgCount.count += 1;
                    await msgCount.save();
                    console.log(msgCount.count);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
})
