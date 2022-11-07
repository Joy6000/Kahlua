const { EventType, eventModule } = require("@sern/handler");
const { ActivityType } = require("discord.js")
exports.default = eventModule({
    name: "ready",
    type: EventType.Discord,
    async execute(client) {
        console.log(`${client.guilds.cache.size} servers`)

        client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} Servers` }], status: 'online' });
        client.user.setActivity('discord.js', { type: ActivityType.Watching });

    }
})