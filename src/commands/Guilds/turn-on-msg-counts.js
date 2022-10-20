const { CommandType, commandModule } = require('@sern/handler');
const { publish, permcheck } = require("../../../utils/plugins.js")
const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js")
const { GuildSettings } = require("../../models.sql")

exports.default = commandModule({
    name: 'toggle-message-counts',
    description: 'Turn message counts on or off',
    plugins: [publish(), permcheck(PermissionsBitField.Flags.ManageGuild, "You cannot use this command.")],
    options: [
        {
            name: "toggled",
            description: "On or Off",
            type: ApplicationCommandOptionType.Boolean,
            required: true
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
        try {
            const [, options] = args
            const toggled = options.getBoolean("toggled")

            const guild = await GuildSettings.findOne({where: {id: ctx.guildId}})
            if (!guild) {
                const newGuild = await GuildSettings.create({id: ctx.guildId, messageCounts: toggled})
                await newGuild.save()
            } else {
                guild.messageCounts = toggled
                await guild.save()
            }

            ctx.reply(`Message counts have been turned ${toggled ? "on" : "off"}.`)
        } catch (err) {
            console.log(err)
        }
    }
})