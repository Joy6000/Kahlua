const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../utils/publish")
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")


exports.default = commandModule({
    name: 'info',
    plugins: [publish()],
    description: 'Information about [x]',
    options: [
        {
            name: "server",
            type: ApplicationCommandOptionType.Subcommand,
            description: "list info on this server"
        },
        {
            name: "user",
            type: ApplicationCommandOptionType.Subcommand,
            description: "List a users info",
            options: [
                {
                    name: "user",
                    description: "Get info on this user",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true,
                    command: {
                        onEvent: [],
                        async execute(ctx) {
                            const focus = ctx.options.getFocused()
                            const lastFiveMsgs = await ctx.channel.messages.fetch({limit: 5})
                            let choices = [];


                            lastFiveMsgs.forEach(msg => {
                                const {author, member} = msg

                                const toPush = {
                                    name: member.nickname ? member.nickname : author.username,
                                    value: author.id
                                }

                                choices.push(toPush)
                            })


                            const hash = new Set
                            const unique = choices.filter(o => !hash.has(JSON.stringify(o)) && hash.add(JSON.stringify(o)));
                            const filtered = unique.filter(choice => choice.name.startsWith(focus))
                            ctx.respond(
                                filtered.map(choice => ({name: choice.name, value: choice.value}))
                            )
                        }
                    }
                }
            ]
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
        const [, options] = args
        const subCmd = options.getSubcommand()

        switch(subCmd) {
            case "server":
                ctx.reply({
                    content: ctx.guild.name // Placeholder
                })
            break
            case "user":
                const user = await ctx.client.users.fetch(options.getString('user'))

                ctx.reply({
                    content: user.username // Placeholder
                })
            break
        }
    }
});