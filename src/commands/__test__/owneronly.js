const { CommandType, commandModule } = require('@sern/handler');
const { publish, ownerOnly } = require("../../../utils/plugins.js")
const { TestChannels } = require("../../models.sql")

exports.default = commandModule({
    name: 'owneronly',
    plugins: [publish(), ownerOnly()],
    description: 'Owner Only',
    type: CommandType.Slash,
    async execute(ctx) {
        // _____TESTING_____ //
        ctx.reply("Soon:tm:")
        // _____TESTING_____ //
    }
});




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}