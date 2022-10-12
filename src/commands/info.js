const { CommandType, commandModule } = require('@sern/handler');
const { publish } = require("../../utils/publish")
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")


exports.default = commandModule({
    name: 'info',
    plugins: [publish()],
    description: 'Information about [x]',
    options: [
        {
            name: "server",
            type: ApplicationCommandOptionType.Subcommand,
            description: "list info on this server"
        },
        {
            name: "user",
            type: ApplicationCommandOptionType.Subcommand,
            description: "List a users info",
            options: [
                {
                    name: "user",
                    description: "Get info on this user",
                    type: ApplicationCommandOptionType.User,
                    required: false,
                }
            ]
        }
    ],
    type: CommandType.Slash,
    async execute(ctx, args) {
        const [, options] = args
        const subCmd = options.getSubcommand()

        switch(subCmd) {
            case "server":
                try {
                    const arr = [
                        `**Name:** \`${ctx.guild.name}\``,
                        ``,
                        `**Owner:** ${await ctx.guild.members.fetch(ctx.guild.ownerId)}`,
                        ``,
                        `**Member Count:** ${await getCount(ctx.guild, "Humans")}`,
                        ``,
                        `**Bot Count:** ${await getCount(ctx.guild, "Bots")}`,
                        ``,
                        `**Total Member Count:** ${await getCount(ctx.guild, "Total")}`,
                        ``,
                        `**Server Boost Count:** \`${ctx.guild.premiumSubscriptionCount}\``,
                        ``,
                        `**Server Boost Level:** \`${ctx.guild.premiumTier}\``,
                    ]

                    const embed = {
                        description: `\n${arr.join('\n')}`,
                        author: {
                            icon_url: ctx.guild.iconURL(),
                            name: `${ctx.guild.name}'s Info`
                        }
                    }
                    ctx.reply({
                        embeds: [embed]
                    })
                } catch (e) {
                    console.log(e)
                }
            break
            case "user":
                let member;

                if (options.getMember('user')) {
                    member = await ctx.interaction.guild.members.fetch(options.getMember('user'))
                } else {
                    member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id)
                }
                try {

                const arr = [
                    `**Nickname:** \`${member.nickname ? member.nickname : "No Nickname"}\``,
                    ``,
                    `**Username:** \`${member.user.username}\``,
                    ``,
                    `**Server Role:** \`${getPermission(member)}\``,
                    ``,
                    `**Date Created:** <t:${Math.round(member.user.createdTimestamp / 1000)}:F>`,
                    ``,
                    `**Date Joined:** <t:${Math.round(member.joinedTimestamp / 1000)}:F>`,
                    ``,
                    `**Status:** \`${getStatus(member)}\``
                    ];

                const embed = {
                    description: `\n${arr.join('\n')}`,
                    author: {
                        icon_url: member.user.displayAvatarURL(),
                        name: `${member.user.username}'s Info`
                    }
                }


                    ctx.reply({
                        embeds: [embed]
                    })
                } catch (e) {
                    console.log(e)
                }
            break
        }
    }
});


const getPermission = (member) => {
    let permissionRole;

    if (member.guild.ownerId === member.user.id)
        return permissionRole = 'Server Owner';

    if (member.permissions.has("Administrator"))
        return  permissionRole = "Administrator";

    if (member.permissions.has("BanMembers") || member.permissions.has("KickMembers"))
        return permissionRole = "Moderator";

    if (member.permissions.has('ManageMessages'))
        return permissionRole = "Helper";
    else
        return permissionRole =  "Member";
}

const getStatus = (member) => {
    const statuses = {
        "ONLINE": {
            name: 'Online',
            emoji: '🟢'
        },
        "INVISIBLE": {
            name: 'Invisible',
            emoji: '👤'
        },
        "OFFLINE": {
            name: 'Offline',
            emoji: '📴'
        },
        "DND": {
            name: 'Do Not Disturb',
            emoji: '🔴'
        },
        "IDLE": {
            name: 'Idle',
            emoji: '🌙'
        }
    }

    let status = member.presence.status.toUpperCase()
    if(!status) return `No status`
    let obj = statuses[status]
    return `${obj.emoji} ${obj.name}`
}

const getCount = async (guild, type) => {
    let toReturn;
    switch(type) {
        case "Humans":
            toReturn = (await guild.members.fetch()).filter(e => !e.user.bot).size;
        break
        case "Bots":
            toReturn = (await guild.members.fetch()).filter(e => e.user.bot).size
        break
        case "Total":
            toReturn = guild.memberCount
        break
    }
    return `\`${toReturn}\``
}