const { CommandType, commandModule } = require('@sern/handler');
const { publish, permcheck } = require("../../../utils/plugins.js")
const { ApplicationCommandOptionType } = require("discord.js")
const { PermissionsBitField: { Flags: perms } } = require("discord.js")
let choices = [
    {
        name: "Off",
        value: 0
    },
    {
        name: "5 seconds",
        value: 5
    },
    {
        name: "10 seconds",
        value: 10
    },
    {
        name: "15 seconds",
        value: 15
    },
    {
        name: "20 seconds",
        value: 20
    },
    {
        name: "25 seconds",
        value: 25
    },
    {
        name: "30 seconds",
        value: 30
    },
    {
        name: "1 minute",
        value: 60
    },
    {
        name: "5 minutes",
        value: 60 * 5
    },
    {
        name: "10 minutes",
        value: 60 * 10
    },
    {
        name: "15 minutes",
        value: 60 * 15
    },
    {
        name: "30 minutes",
        value: 60 * 30
    },
    {
        name: "1 hour",
        value: 60 * 60
    },
    {
        name: "3 hours",
        value: 60 * 60 * 3
    },
    {
        name: "5 hours",
        value: 60 * 60 * 5
    },
    {
        name: "6 hours",
        value: 60 * 60 * 6
    }
]


exports.default = commandModule({
    name: 'slowmode',
    description: 'Set\'s the slowmode of this channel',
    plugins: [publish(), permcheck(perms.ManageMessages, "You need the `Manage Messages` permission to use this command")],
    options: [
        {
            name: "time",
            description: "Set slowmode time. For a custom amount, input seconds.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            autocomplete: true,
            command: {
                onEvent: [],
                async execute(ctx) {
                    const focused = ctx.options.getFocused()
                    const filtered = choices.filter(choice => choice.name.startsWith(focused))
                    ctx.respond(
                        filtered.map(choice => ({ name: choice.name, value: choice.value }))
                    )
                }
            }
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
        const [, options] = args
        let opt = options.get("time")
        let index = choices.map(function(e) { return e.value; }).indexOf(opt.value);
        let time = choices[index]


        ctx.channel.setRateLimitPerUser(time.value)

        ctx.reply({
            content: `${time.name !== "Off" ? `Set slowmode to ${time.name} successfully.` : "Disabled slowmode successfully."}`
        })
    }
})