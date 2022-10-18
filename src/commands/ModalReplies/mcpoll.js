const { CommandType, commandModule } = require('@sern/handler');

exports.default = commandModule({
    name: 'mcpoll',
    type: CommandType.Modal,
    async execute(modal) {
        const { fields } = modal
        let inputs = []
        let finalizedInputs = []
        let reactions = [
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣'
        ]

        const input1 = fields.getTextInputValue("input1").length > 0 ? fields.getTextInputValue("input1") : null
        const input2 = fields.getTextInputValue("input2").length > 0 ? fields.getTextInputValue("input2") : null
        const input3 = fields.getTextInputValue("input3").length > 0 ? fields.getTextInputValue("input3") : null
        const input4 = fields.getTextInputValue("input4").length > 0 ? fields.getTextInputValue("input4") : null
        const input5 = fields.getTextInputValue("input5").length > 0 ? fields.getTextInputValue("input5") : null

        inputs = [input1, input2, input3, input4, input5]

        finalizedInputs = inputs.filter(n => n)
        const reactionCount = finalizedInputs.length

            let preReact = reactions.splice(0, reactionCount)
            let msg = `**${modal.member.displayName}** has started a multiple choice poll:\n`
            for (let counter = 0; counter < preReact.length; ++counter) {
                msg += `**${counter + 1}:** ${finalizedInputs[counter]}\n`
            }
            modal.channel.send(msg).then(msg => {
                preReact.forEach(r => msg.react(r))
            })
            modal.reply({
                content: "Poll sent!",
                ephemeral: true
            })
    }
})