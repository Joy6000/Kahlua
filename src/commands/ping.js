const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../utils/publish")

exports.default = commandModule({
    name: 'ping',
    plugins: [publish()],
    description: 'Ping/Pong',
    type: CommandType.Both,
    execute(ctx) {
        ctx.reply({
            content: `API Heartbeat:\n${ctx.client.ws.ping}ms`
        })
    }
});