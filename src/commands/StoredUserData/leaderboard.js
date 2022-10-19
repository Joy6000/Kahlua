const {
    CommandType,
    commandModule
} = require('@sern/handler');
const {
    publish
} = require("../../../utils/plugins.js")

exports.default = commandModule({
    name: 'leaderboard',
    plugins: [publish()],
    description: 'Displays message leaderboard',
    type: CommandType.Slash,
    async execute(ctx, args) {
        const {
            MessageCounts,
            GuildSettings
        } = require("../../models.sql")

        const _guild = await GuildSettings.findOne({
            where: {
                id: ctx.guildId
            }
        })
        const enabled = _guild.get("messageCounts")

        if (!enabled) return ctx.reply("Sorry, this guild currently doesn't count messages! You can turn this on by" +
            " using the `toggle-message-counts` command! Though, only admins can do this.");

        const all = await MessageCounts.findAll({
            where: {
                guildId: ctx.guildId
            }
        })
        let countedArr = [];
        let msg = `**Top NumberOfPeopleInArray People With the Most Messages Sent in *${ctx.guild.name}*:**\n\n`;
        let id;
        let len = 0;


        try {

            for (let i = 0; i < all.length; i++) {
                id = (await ctx.guild.members.fetch(all[i].get("userId"))).displayName
                countedArr.push({
                    user: id,
                    count: all[i].count
                })
            }
            countedArr.splice(10)

            countedArr.sort((a, b) => {
                return a.count - b.count;
            }).reverse()
            const {
                length: len
            } = countedArr

            for (const counted of countedArr) {
                msg += `#${countedArr.indexOf(counted) + 1}: ${counted.user} with ${counted.count} messages\n`
            }

            ctx.reply({
                content: msg.replace("NumberOfPeopleInArray", len.toString())
            })
        } catch (e) {
            console.log(e)
        }
    }
});
