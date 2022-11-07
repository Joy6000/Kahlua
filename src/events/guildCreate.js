const { EventType, eventModule } = require("@sern/handler");
exports.default = eventModule({
    name: "guildCreate",
    type: EventType.Discord,
    async execute(guild) {
        console.log(`Joined Guild "${guild.name}" (${guild.id})`)
    }
})