const { EventType, eventModule } = require("@sern/handler");
const { ActivityType } = require("discord.js")
exports.default = eventModule({
    name: "ready",
    type: EventType.Discord,
    async execute(client) {
        console.log(`${client.guilds.cache.size} servers`)
        client.user.setActivity(`${client.guilds.cache.size} Servers`, { type: ActivityType.Watching });

    }
})