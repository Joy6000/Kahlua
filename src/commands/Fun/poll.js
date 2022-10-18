const { CommandType, commandModule } = require('@sern/handler');
const { publish, ownerOnly } = require("../../../utils/plugins.js")
const { ApplicationCommandOptionType } = require("discord.js")
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


exports.default = commandModule({
    name: 'poll',
    description: 'starts a poll',
    plugins: [publish()],
    options: [
        {
            name: "vote",
            description: "Vote on something",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "choices",
                    description: "Choices to vote on",
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "mcpoll",
            description: "Multiple Choice Poll (Will open up a modal)",
            type: ApplicationCommandOptionType.Subcommand
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
        const [, options] = args
        const subCMD = options.getSubcommand()

        switch(subCMD) {
            case "mcpoll":
                const modal = new ModalBuilder()
                    .setTitle("Create a Multiple Choice Poll!")
                    .setCustomId("mcpoll")

                const input1 = new TextInputBuilder()
                    .setCustomId("input1")
                    .setLabel("First Option")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
                const input2 = new TextInputBuilder()
                    .setCustomId("input2")
                    .setLabel("Second Option")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
                const input3 = new TextInputBuilder()
                    .setCustomId("input3")
                    .setLabel("Third Option (Leave blank to skip)")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false)
                const input4 = new TextInputBuilder()
                    .setCustomId("input4")
                    .setLabel("Fourth Option (Leave blank to skip)")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false)
                const input5 = new TextInputBuilder()
                    .setCustomId("input5")
                    .setLabel("Fifth Option (Leave blank to skip)")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false)

                const actionRow1 = new ActionRowBuilder().addComponents(input1)
                const actionRow2 = new ActionRowBuilder().addComponents(input2)
                const actionRow3 = new ActionRowBuilder().addComponents(input3)
                const actionRow4 = new ActionRowBuilder().addComponents(input4)
                const actionRow5 = new ActionRowBuilder().addComponents(input5)

                modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4, actionRow5)

                try {
                    await ctx.interaction.showModal(modal)
                } catch (e) {
                    console.log(e)
                    }

                break
            default:
                ctx.reply({
                    content:
                    `**${ctx.member?.nickname ? ctx.member.nickname : ctx.user.username} Started a poll:**\n\n${options.getString("choices")}`
                }).then(msg => {
                    ['👍', '👎'].forEach(reaction => {
                        msg.react(reaction)
                    })
                })
            break
        }
    }
})