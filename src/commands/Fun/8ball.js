const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../../utils/plugins.js")
const { ApplicationCommandOptionType } = require("discord.js")

exports.default = commandModule({
    name: 'eightball',
    description: 'Ask the 8ball',
    plugins: [publish()],
    type: CommandType.Slash,
    options: [
        {
            name: "what-to-ask",
            type: ApplicationCommandOptionType.String,
            description: "What to ask",
            required: true
        }
    ],
    async execute(ctx, args) {
        let [, options] = args
        const responses = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
            "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.",
            "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.",
            "Yes.", "Yes – definitely.", "You may rely on it."]

        let response = responses[Math.floor(Math.random() * responses.length)]

        ctx.reply({
            content: `*${options.getString('what-to-ask')}:*\n${response}`
        })
    }
})