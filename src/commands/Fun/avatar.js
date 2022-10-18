const { CommandType, commandModule } = require('@sern/handler');
const { publish, ownerOnly } = require("../../../utils/plugins.js")
const { ApplicationCommandOptionType } = require("discord.js")


exports.default = commandModule({
    name: 'avatar',
    description: 'Shows the avatar of you or another person',
    plugins: [publish()],
    type: CommandType.Slash,
    options: [
        {
            name: "user",
            description: "User's who avatar you want",
            required: false,
            type: ApplicationCommandOptionType.User
        }
    ],
    async execute(ctx, args) {
        const [, options] = args

        let user = options.getUser("user")
        let member = options.getMember("user")

        if (user) {
            const emb = {
                color: 0x2e3137,
                author: {
                    name: `${ctx.member?.nickname ? ctx.member.nickname : ctx.user.username}`,
                    icon_url: ctx.user.displayAvatarURL()
                },
                image: {
                    url: user.displayAvatarURL({ size: 4096 })
                },
                title: `${member?.nickname ? member.nickname : user.username}'s Avatar:`
            }
            ctx.reply({
                embeds: [emb]
            })
        } else {
            const emb = {
                color: 0x2e3137,
                author: {
                    name: `${ctx.member?.nickname ? ctx.member.nickname : ctx.user.username}`,
                    icon_url: ctx.user.displayAvatarURL()
                },
                image: {
                    url: ctx.user.displayAvatarURL({ size: 4096 })
                },
                title: `${ctx.member?.nickname ? ctx.member.nickname : ctx.user.username}'s Avatar:`
            }
            ctx.reply({
                embeds: [emb]
            })
        }
    }
})