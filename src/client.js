const { GatewayIntentBits } = require("discord.js")
const { Sern } = require("@sern/handler");
const { Sequelize } = require("sequelize");
require('dotenv').config()

module.exports.default = new class Kahlua extends require("discord.js").Client {
    constructor(options = {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.MessageContent
        ]
    }) {
        super(options);
    }

    start(bool) {
        this.on("ready", () => {
            for(const property in require("./models.sql")) {
                require("./models.sql")[property].sync()
                if(bool) {
                    console.log(`Synced ${property} model`)
                }
            }
            console.log("We are in.")
        })

        const { Sern } = require("@sern/handler")

        Sern.init({
            client: this,
            defaultPrefix: 'k!',
            commands: 'src/commands',
            events: 'src/events'
        })


            module.exports.sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            // SQLite only
            storage: 'db.sqlite',
        });

        this.login(process.env.TOKEN)
        return this
    }
}

