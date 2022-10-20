// EVENTS //
const { EventType, eventModule } = require("@sern/handler");
exports.default = eventModule({
    name: "ofEvent",
    type: EventType.Discord,
    async execute(params) {
        // CODE HERE... //
    }
})


// COMMANDS //
const { CommandType, commandModule } = require('@sern/handler');
const { publish, ownerOnly, permcheck } = require("../../../utils/plugins.js")
const { Model } = require("../../models.sql")
const { ApplicationCommandOptionType } = require("discord.js")
const { PermissionsBitField: { FLAGS: perms } } = require("discord.js")

exports.default = commandModule({
    name: 'name-of-command',
    description: 'description-of-command',
    plugins: [publish(), ownerOnly(), permcheck(perms.PermissionHere)],
    options: [
        {
            name: "option-name",
            description: "description-of-option",
            type: ApplicationCommandOptionType.OptionTypeHere,
            required: true
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
          // CODE HERE... //
    }
})
/// END OF FILE ///
