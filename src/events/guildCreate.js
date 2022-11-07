const { EventType, eventModule } = require("@sern/handler");
exports.default = eventModule({
    name: "guildCreate",
    type: EventType.Discord,
    async execute(guild, client) {
        console.log(`Joined Guild "${guild.name}" (${guild.id})`)
        let channel = await guild.client.channels.fetch('1039008507174854686')
        channel.send(`Joined Guild "${guild.name}" (${guild.id})`)
    }
})