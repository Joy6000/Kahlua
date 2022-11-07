const { EventType, eventModule } = require("@sern/handler");
const {ActivityType} = require("discord.js");
exports.default = eventModule({
    name: "guildCreate",
    type: EventType.Discord,
    async execute(guild, client) {
        console.log(`Joined Guild "${guild.name}" (${guild.id})`)
        let channel = await guild.client.channels.fetch('1039008507174854686')
        channel.send(`Joined Guild "${guild.name}" (${guild.id})`)
        client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} Servers` }], status: 'online' });
        client.user.setActivity('discord.js', { type: ActivityType.Watching });
    }
})