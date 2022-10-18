const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../../utils/plugins.js")

exports.default = commandModule({
    name: 'invite',
    description: 'Invite the bot to your server',
    plugins: [publish()],
    type: CommandType.Slash,
    async execute(ctx) {
        const embed = {
            description: `**Invite Link:** [Click Here](https://discord.com/api/oauth2/authorize?client_id=1029211192503308329&permissions=8&scope=bot%20applications.commands)`,
            color: 0x2e3137
        }
        ctx.reply({
            embeds: [embed]
        })
    }
})