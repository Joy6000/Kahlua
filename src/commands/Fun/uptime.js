const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../../utils/plugins.js")
const ms = require("ms");

exports.default = commandModule({
    name: 'uptime',
    description: 'Get the amount of time I have been online',
    plugins: [publish()],
    type: CommandType.Slash,
    async execute(ctx) {
        ctx.reply({
            content:
            `I have been online for ${ms(ctx.client.uptime, {
                long: true
            })}`
        })
    }
})