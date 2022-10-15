const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../utils/publish")
const { TestChannels } = require("../models.sql")

exports.default = commandModule({
    name: 'owneronly',
    plugins: [publish()],
    description: 'Owner Only',
    type: CommandType.Slash,
    async execute(ctx) {
        // _____TESTING_____ //
        const channel = await TestChannels.findOne({
            where: {
                name: "generic-channel-name"
            }
        })
        console.log(channel.get("id"))
        ctx.reply('Logged to console')
        // _____TESTING_____ //
    }
});




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}