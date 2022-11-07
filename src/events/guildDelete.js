const { EventType, eventModule } = require("@sern/handler");
const {ActivityType} = require("discord.js");
exports.default = eventModule({
    name: "guildDelete",
    type: EventType.Discord,
    async execute(guild) {
        try {
            console.log(`Left Guild "${guild.name}" (${guild.id})`)
            let channel = await guild.client.channels.fetch('1039008507174854686')
            channel.send(`Left Guild "${guild.name}" (${guild.id})`)
            let count = guild.client.guilds.cache.size;
            guild.client.user.setActivity(`${count} Servers`, {type: ActivityType.Watching});
        } catch (e) {
            console.log(e)
        }
    }
})