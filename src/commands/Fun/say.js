const { Sern, CommandType, commandModule, } = require('@sern/handler');
const { publish } = require('../../../utils/plugins');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,ApplicationCommandOptionType } = require('discord.js');
const { InteractionCollector } = require('discord.js');

exports.default = commandModule({
    description: 'Say',
    type: CommandType.Slash,
    options: [
        {
            name: 'what-to-say',
            description: 'What do you want me to say?',
            required: true,
            type: ApplicationCommandOptionType.String
        },

        {
            name: 'channel',
            description: 'Where do I send the message to? Leave blank if here.',
            required: false,
            type: ApplicationCommandOptionType.Channel
        },
        {
            name: 'reply',
            description: 'Paste the ID of the message you want to reply to here.',
            required: false,
            type: ApplicationCommandOptionType.String
        }
    ],
    plugins: [publish()],
    async execute(int, options) {
        // if (int.user.id === '488423424969015296') return;
        const message = options[1].getString('what-to-say')
        const channel = options[1].getChannel('ch', false) ? options[1].getChannel('ch', false) : int.interaction.channel
        const messageReply = options[1].getString('reply', false) ? await channel.messages.fetch(options[1].getString('reply', false)) : null

        if(messageReply !== null) {
            await messageReply.reply(message)
        } else
            await channel.send(message)
        int.reply({
            ephemeral: true,
            content: 'Sent!'
        })

    }
})