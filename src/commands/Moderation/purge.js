const { CommandType, commandModule } = require('@sern/handler');
const { publish, permcheck } = require("../../../utils/plugins.js")
const { ApplicationCommandOptionType } = require("discord.js")
const { PermissionsBitField: { Flags: perms } } = require("discord.js")
let choices = [
    {
        name: '5',
        value: 5
    },
    {
        name: '10',
        value: 10
    },
    {
        name: '25',
        value: 25
    },
    {
        name: '50',
        value: 50
    },
    {
        name: '100',
        value: 100
    }
]

exports.default = commandModule({
    name: 'purge',
    description: 'Purge a channel...Up to 100 messages.',
    plugins: [publish(), permcheck(perms.ManageMessages)],
    options: [
        {
            name: "amount",
            description: "Number of messages to delete (limit 100)",
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
        },
        {
            name: "delete-pins",
            description: "Whether or not to delete pins. True for yes. False is default.",
            type: ApplicationCommandOptionType.Boolean,
            required: false
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
        let [, options] = args;
        let amount = options.getInteger("amount");
        let bool = options.getBoolean("delete-pins");
        let deletePins = bool ? bool : false;
        let toDelete;
        let size;
        let warning = amount > 100 ? `You may have told me to delete ${amount} messages, but the workers over at Discord disallow that. So, I've only deleted 100 messages.` +
        `You may run this command more than once. Also note that if a message is two weeks old, you are unable to delete it using this command.` : "";
        if (amount > 100) amount = 100;

        if (!deletePins) {
            let fetched = await ctx.channel.messages.fetch({limit: amount});
            let filtered = fetched.filter(m => !m.pinned);
            toDelete = filtered;
            size = filtered.size;
        }
         else {
            toDelete = amount;
            size = amount;
        }

        try {
            ctx.channel.bulkDelete(toDelete)

            ctx.reply(`Successfully deleted ${size} messages! ${warning}`)

            setTimeout(() => {
                ctx.interaction.deleteReply()
            }, 5000)
        } catch (e) {
            console.log(e)
            ctx.reply({
                content: "There was an error executing this command. Please try again later.",
                ephemeral: true
            })
        }
    }
})