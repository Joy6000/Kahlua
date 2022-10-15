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
const { publish, ownerOnly } = require("../../../utils/plugins.js")

exports.default = commandModule({
    name: 'TBD',
    description: 'TBD',
    plugins: [publish(), ownerOnly()],
    type: CommandType.Slash,
    async execute(ctx, args) {
          // CODE HERE... //
    }
})
/// END OF FILE ///
