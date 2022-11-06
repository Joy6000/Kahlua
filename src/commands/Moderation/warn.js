const { CommandType, commandModule } = require('@sern/handler');
const { publish, permcheck } = require("../../../utils/plugins.js")
const { UserData, GuildSettings } = require("../../models.sql")
const { ApplicationCommandOptionType } = require("discord.js")
const { PermissionsBitField: { Flags: perms } } = require("discord.js")

exports.default = commandModule({
    name: 'warn',
    description: 'Warns a user',
    plugins: [publish(), permcheck(perms.ManageMembers)],
    options: [
        {
            name: "user",
            description: "User",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Reason",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
        try {
            let [, options] = args
            if (!options.getMember("user")) {
                return ctx.reply("Invalid user.")
            }
            let member = options.getMember("user")
            let { user } = member
            let reason = options.getString("reason") ? options.getString("reason") : "*No Reason Added*"


            let usersData = await UserData.findOne({where: {userId: user.id}})
            let guildsData = await GuildSettings.findOne({where: {id: ctx.guild.id}})
            let warnsData = JSON.parse(guildsData.warnsData)

            if (!usersData) {
                usersData = await UserData.create({id: generateRandomNumber(), warns: 1, userId: user.id, guildId: ctx.guildId})
                usersData.save()
            } else {
                usersData.warns += 1
                usersData.save()
            }

            let warns = usersData.warns !== 1 ? "warns" : "warn"

            let warnsMute = parseInt(warnsData.mute)
            let warnsKick = parseInt(warnsData.kick)
            let warnsBan = parseInt(warnsData.ban)


            if(usersData.warns === warnsMute) {
                member.timeout(21600000, reason)
                ctx.reply({
                    content: `${member} has been muted for 6 hours because they had been warned ${warnsMute} times. Reason: ${reason}`
                })
                user.send({
                    content: `You have been muted for 6 hours in **${ctx.guild.name}**\nReason: "${reason}"`
                })
            } else if (usersData.warns === warnsKick) {
                ctx.reply({
                    content: `${member} has been kicked because they had been warned ${warnsKick} times. Reason: ${reason}`
                })
                user.send({
                    content: `You have been kicked from **${ctx.guild.name}**\nReason: "${reason}"`
                })
                setTimeout(() => {
                    member.kick(reason)
                }, 500)
            } else if (usersData.warns === warnsBan) {
                ctx.reply({
                    content: `${member} has been banned. Reason: ${reason}`
                })
                user.send({
                    content: `You have been banned from **${ctx.guild.name}** for receiving too many warns.\nReason: "${reason}"`
                })
                setTimeout(() => {
                    member.ban({ deleteMessageSeconds: 60 * 60 * 24 * 7, reason: reason })
                }, 500)
                usersData.warns = 0;
                usersData.save()
            } else {
                ctx.reply({
                    content: `Successfully warned ${member}. They now have ${usersData.warns} ${warns}.`
                })
                if (usersData.warns > warnsBan) usersData.warns = 0;
                usersData.save()
            }


        }  catch (e) {
            console.log(e)
        }
    }
})



function generateRandomNumber () {
    return Math.floor(Math.random() * 99999999999999)
}