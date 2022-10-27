const { CommandType, commandModule } = require('@sern/handler');
const { publish, ownerOnly, confirmation} = require("../../../utils/plugins.js")
const { ApplicationCommandOptionType } = require("discord.js")
const { REST, Routes } = require("discord.js")
const rest = new REST({ version: '10' }).setToken(require("../../../config.json").token);

exports.default = commandModule({
    name: 'delete-command',
    description: 'Deletes a command',
    plugins: [publish(), ownerOnly(), confirmation()],
    options: [
        {
            name: "command",
            description: "command to delete",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
            command: {
                onEvent: [],
                async execute(ctx) {
                    const focused = ctx.options.getFocused()
                    const commands = await ctx.client.application.commands.fetch()

                    const filtered = commands.filter(command => command.name.startsWith(focused))
                    ctx.respond(
                        filtered.map(command => ({ name: command.name, value: command.id }))
                    )
                }
            }
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
        try {
            const [, options] = args
            let cmd = options.get("command")
            console.log(cmd)
            const command = await ctx.client.application.commands.fetch(cmd.value)

            await rest.delete(Routes.applicationCommand("1029211192503308329", cmd.value))
                .then(() => console.log(`Successfully deleted application command:\n${command.name}`))
                .catch(console.error);

            ctx.interaction.editReply({
                content: `✅ Successfully deleted command: "${command.name}"`
            })
        } catch (e) {
            console.log(e)
            ctx.interaction.editReply({
                content: `❌ Failed to delete command: "${command.name}"`
            })
        }
    }
})