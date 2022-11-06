const { CommandType, commandModule } = require('@sern/handler');
const { GuildSettings } = require("../../models.sql")

exports.default = commandModule({
    name: 'warns',
    type: CommandType.Modal,
    async execute(modal) {
        try {
            const {fields} = modal

            let input1 = fields.getTextInputValue("numberOfWarns-Mute")
            let input2 = fields.getTextInputValue("numberOfWarns-Kick")
            let input3 = fields.getTextInputValue("numberOfWarns-Ban")

            let data = `{"mute": "${parseInt(input1)}", "kick": "${parseInt(input2)}", "ban": "${parseInt(input3)}"}`

            const guild = await GuildSettings.findOne({where: {id: modal.guildId}})
            if (!guild) {
                const newGuild = await GuildSettings.create({id: modal.guildId, warnsData: data})
                await newGuild.save()
            } else {
                guild.warnsData = data;
                await guild.save()
            }

            if (input1 === "0" || input2 === "0" || input3 === "0") {
                modal.reply("Process failed because you cannot input 0 as a value. This will cause many errors. If you want the warns system to be unable to kick, use -1.")
                return
            }
            modal.reply({
                content: `Done!\nNumber of Warns Until Mute: ${input1 === "-1" ? "off" : input1} warns\nNumber of Warns Until Kick: ${input2 === "-1" ? "off" : input2} warns\nNumber of Warns Until Ban: ${input2 === "-1" ? "off" : input2} warns`
            })
        }  catch (e) {
            console.log(e)
        }
    }
})