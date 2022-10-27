const  { CommandType, PluginType } = require("@sern/handler");


module.exports.ownerOnly = function ownerOnly() {
    const ownerIDs = ["527599831091380234"]; //! Fill your ID

    return {
        type: PluginType.Event,
        description: "Allows only bot owner to run command",

        async execute(event, controller) {
            const [ctx] = event;
            if (ownerIDs.includes(ctx.user.id)) return controller.next(); //* If you want to reply when the command fails due to user not being owner, you can use following
            await ctx.reply("You are not the owner of this bot. You can not run this command.");

            return controller.stop(); //! Important: It stops the execution of command!
        },
    };
}

// @ts-nocheck

/**
 * This is publish plugin, it allows you to publish your application commands with ease.
 *
 * @author @EvolutionX-10 [<@697795666373640213>]
 * @version 1.3.0
 * @example
 * ```ts
 * import { publish } from "../plugins/publish";
 * import { commandModule } from "@sern/handler";
 * export default commandModule({
 *  plugins: [ publish() ], // put an object containing permissions, ids for guild commands, boolean for dmPermission
 *  // plugins: [ publish({ guildIds: ['guildId'], defaultMemberPermissions: 'Administrator'})]
 *  execute: (ctx) => {
 * 		//your code here
 *  }
 * })
 * ```
 */
const { ApplicationCommandType } = require("discord.js");
function publish(options) {
    return {
        type: PluginType.Command,
        description: "Manage Slash Commands",
        name: "slash-auto-publish",

        async execute({ client }, { mod: module }, controller) {
            const defaultOptions = {
                guildIds: [],
                dmPermission: undefined,
                defaultMemberPermissions: null,
            };
            options = { ...defaultOptions, ...options };
            let { defaultMemberPermissions, dmPermission, guildIds } = options;

            function c(e) {
                console.error("publish command didnt work for", module.name);
                console.error(e);
            }

            try {
                const commandData = {
                    type: CommandTypeRaw[module.type],
                    name: module.name,
                    description: [CommandType.Slash, CommandType.Both].includes(
                        module.type
                    )
                        ? module.description
                        : undefined,
                    options: [CommandType.Slash, CommandType.Both].includes(
                        module.type
                    )
                        ? optionsTransformer(module.options ?? [])
                        : [],
                    defaultMemberPermissions,
                    dmPermission,
                };

                if (!guildIds.length) {
                    const cmd = (
                        await client.application.commands.fetch()
                    ).find(
                        (c) =>
                            c.name === module.name &&
                            c.type === CommandTypeRaw[module.type]
                    );

                    if (cmd) {
                        if (!cmd.equals(commandData, true)) {
                            console.log(
                                `Found differences in global command ${module.name}`
                            );
                            cmd.edit(commandData).then(() => {
                                console.log(
                                    `${module.name} updated with new data successfully!`
                                );
                            });
                        }

                        return controller.next();
                    }

                    client.application.commands
                        .create(commandData)
                        .then(() => {
                            console.log("Command created", module.name);
                        })
                        .catch(c);
                    return controller.next();
                }

                for (const id of guildIds) {
                    const guild = await client.guilds.fetch(id).catch(c);
                    if (!guild) continue;
                    const guildcmd = (await guild.commands.fetch()).find(
                        (c) =>
                            c.name === module.name &&
                            c.type === CommandTypeRaw[module.type]
                    );

                    if (guildcmd) {
                        if (!guildcmd.equals(commandData, true)) {
                            console.log(
                                `Found differences in command ${module.name}`
                            );
                            guildcmd
                                .edit(commandData)
                                .then(() =>
                                    console.log(
                                        `${module.name} updated with new data successfully!`
                                    )
                                )
                                .catch(c);
                            continue;
                        }

                        continue;
                    }

                    guild.commands
                        .create(commandData)
                        .then(() =>
                            console.log(
                                "Guild Command created",
                                module.name,
                                guild.name
                            )
                        )
                        .catch(c);
                }

                return controller.next();
            } catch (e) {
                console.log("Command did not register" + module.name);
                console.log(e);
                return controller.stop();
            }
        },
    };
}
function optionsTransformer(ops) {
    return ops.map((el) =>
        el.autocomplete ? (({ command, ...el }) => el)(el) : el
    );
}
const CommandTypeRaw = {
    [CommandType.Both]: ApplicationCommandType.ChatInput,
    [CommandType.MenuMsg]: ApplicationCommandType.Message,
    [CommandType.MenuUser]: ApplicationCommandType.User,
    [CommandType.Slash]: ApplicationCommandType.ChatInput,
};

module.exports.publish = publish







module.exports.permcheck = function permCheck(perm, response) {
    return {
        type: PluginType.Event,
        description: "Checks for specified perm",

        async execute(event, controller) {
            const [ctx] = event;

            if (ctx.guild === null) {
                ctx.reply("This command cannot be used here");
                console.warn(
                    "PermCheck > A command stopped because we couldn't check a users permissions (was used in dms)"
                ); //delete this line if you dont want to be notified when a command is used outside of a guild/server

                return controller.stop();
            }

            if (!ctx.member.permissions.has(perm)) {
                await ctx.reply(response);
                return controller.stop();
            }

            return controller.next();
        },
    };
}







const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
} = require("discord.js");
module.exports.confirmation = function confirmation(options) {
    return {
        type: PluginType.Event,
        description: "Confirms",

        async execute([ctx], controller) {
            options = {
                content: "Are you sure you want to proceed?",
                denialMessage: "Exited with code 1.",
                labels: ["No", "Yes"],
                time: 60_000,
                wrongUserResponse: "Exited with code 3.",
                ...options,
            };
            const buttons = options.labels.map((l, i) => {
                return new ButtonBuilder()
                    .setCustomId(l)
                    .setLabel(l)
                    .setStyle(
                        i === 0 ? ButtonStyle.Danger : ButtonStyle.Success
                    );
            });
            const sent = await ctx.reply({
                content: options.content,
                components: [new ActionRowBuilder().setComponents(buttons)],
            });
            const collector = sent.createMessageComponentCollector({
                componentType: ComponentType.Button,
                filter: (i) => i.user.id === ctx.user.id,
                time: options.time,
            });
            return new Promise((resolve) => {
                collector.on("collect", async (i) => {
                    await i.update({
                        components: [],
                    });
                    collector.stop();

                    if (i.customId === options.labels[1]) {
                        resolve(controller.next());
                        return;
                    }

                    await i.editReply({
                        content: options?.denialMessage,
                    });
                    resolve(controller.stop());
                });
                collector.on("end", async (c) => {
                    if (c.size) return;
                    buttons.forEach((b) => b.setDisabled());
                    await sent.edit({
                        components: [
                            new ActionRowBuilder().setComponents(buttons),
                        ],
                    });
                });
                collector.on("ignore", async (i) => {
                    await i.reply({
                        content: options?.wrongUserResponse,
                        ephemeral: true,
                    });
                });
            });
        },
    };
}