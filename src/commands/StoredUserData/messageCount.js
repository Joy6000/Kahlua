const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../../utils/plugins.js")

exports.default = commandModule({
    name: 'message-count',
    description: 'Check how many messages you\'ve sent.',
    plugins: [publish()],
    type: CommandType.Slash,
    async execute(ctx, args) {
        try {
            const {UserData, GuildSettings} = require("../../models.sql")

            const _guild = await GuildSettings.findOne({where: {id: ctx.guildId}})
            const found = await UserData.findOne({where: {guildId: ctx.guildId, userId: ctx.user.id}})
            const enabled = _guild.get("messageCounts")

            if (!enabled) return ctx.reply("Sorry, this guild currently doesn't count messages! You can turn this on by"
                + " using the `toggle-message-counts` command! Though, only admins can do this.");

            const responses = [
                "Nice!",
                "Awesome!",
                "Awesome job!",
                "Great job!",
                "Cool!",
                "Yeah!"
            ]

            const res = responses[Math.floor(Math.random() * responses.length)]

            ctx.reply({
                content: `You have sent ${found.get("count")} messages. ${res}`
            })
        } catch (e) {
            console.log(e)
        }
    }
})