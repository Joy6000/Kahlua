const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../utils/publish")

exports.default = commandModule({
    name: 'ping',
    plugins: [publish()],
    description: 'Ping/Pong',
    type: CommandType.Slash,
    async execute(ctx) {
            const msg = await ctx.reply({
                content: `Pinging...`
            })

            msg.edit({
                content: `Ping - ${msg.createdTimestamp - ctx.createdTimestamp}ms\nAPI Round-trip - ${ctx.client.ws.ping}ms`
            })
        }
    });