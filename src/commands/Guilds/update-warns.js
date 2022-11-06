const { CommandType, commandModule } = require('@sern/handler');
const { publish, ownerOnly, permcheck } = require("../../../utils/plugins.js")
const { Model } = require("../../models.sql")
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { PermissionsBitField: { Flags: perms } } = require("discord.js")

exports.default = commandModule({
    name: 'warn-update',
    description: 'Set up or update the warns system',
    plugins: [publish(), permcheck(perms.Administrator)],
    type: CommandType.Slash,
    async execute(ctx, args) {
        try {
            const modal = new ModalBuilder()
                .setTitle('Set up or update the warns system')
                .setCustomId("warns")

            const numberOfWarnsUntilMute = new TextInputBuilder()
                .setCustomId('numberOfWarns-Mute')
                .setPlaceholder('Number of warns')
                .setValue("2")
                .setStyle(TextInputStyle.Short)
                .setLabel('Number of warns required to mute (-1 for off)')

            const numberOfWarnsUntilKick = new TextInputBuilder()
                .setCustomId('numberOfWarns-Kick')
                .setPlaceholder('Number of warns')
                .setValue("3")
                .setStyle(TextInputStyle.Short)
                .setLabel('Number of warns required to kick (-1 for off)')

            const numberOfWarnsUntilBan = new TextInputBuilder()
                .setCustomId('numberOfWarns-Ban')
                .setPlaceholder('Number of warns')
                .setValue("4")
                .setStyle(TextInputStyle.Short)
                .setLabel('Number of warns required to ban (-1 for off)')


            const input1 = new ActionRowBuilder().addComponents(numberOfWarnsUntilMute)
            const input2 = new ActionRowBuilder().addComponents(numberOfWarnsUntilKick)
            const input3 = new ActionRowBuilder().addComponents(numberOfWarnsUntilBan)

            let arr = [
                input1,
                input2,
                input3
            ]

            modal.addComponents(arr)

            ctx.interaction.showModal(modal)


        } catch (e) {
            console.log(e)
        }



    }
})