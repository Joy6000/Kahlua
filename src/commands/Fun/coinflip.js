const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../../utils/plugins.js")

exports.default = commandModule({
    name: 'coinflip',
    description: 'Flip a coin',
    plugins: [publish()],
    type: CommandType.Slash,
    async execute(ctx, args) {
        const options = [
            "Heads",
            "Tails"
        ]

        const msg = await ctx.reply("You flipped a coin! You catch it, and....")

        setTimeout(() => {
            const chosen = options[Math.floor(Math.random() * options.length)]
            msg.edit({
                content:
                `You flipped a coin! You catch it, and....\nIt landed on ${chosen}!`
            })
        }, 1000)
    }
})