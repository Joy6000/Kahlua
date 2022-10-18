const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../../utils/plugins.js")
const { ApplicationCommandOptionType } = require("discord.js")

exports.default = commandModule({
    name: 'diceroll',
    description: 'Roll a dice',
    plugins: [publish()],
    type: CommandType.Slash,
    options: [
        {
            name: "sides",
            description: "The number of sides for each die (Leave blank for 6)",
            required: false,
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: "die",
            description: "The amount of dice to roll (Leave blank for 1)",
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    async execute(ctx, args) {
        const [, options] = args
        let sides = options.getInteger("sides") ? options.getInteger("sides") : 6;
        let die = options.getInteger("die") ? options.getInteger("die") : 1;
        if (sides > 100) sides = 100
        if (die > 10) die = 10
        let appended = die > 1 ? "'s" : ""
        let msg = `You rolled ${die} d${sides}${appended}\n`;
        let arr = [];


        for (let i = 0; i < die; i++) {
                let num = getRandomInteger(sides)
                msg += `**Dice #${i + 1}:** ${num}\n`
                arr.push(num)
        }
        let addedToMsg = arr.reduce(add, 0)
        msg += `\n**For a total of:** ${addedToMsg}`

        ctx.reply({
            content: msg
        })

    }
})

function getRandomInteger(max) {
    return Math.floor(Math.random() * max)
}
function add(accumulator, a) {
    return accumulator + a;
}