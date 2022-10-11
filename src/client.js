const { GatewayIntentBits } = require("discord.js")
const { Sern } = require("@sern/handler");
require('dotenv').config()

module.exports = class Kahlua extends require("discord.js").Client {
    constructor(options = {
        intents: [
            GatewayIntentBits.Guilds,
        ]
    }) {
        super(options);
    }

    start() {
        this.on("ready", () => {
            console.log("We are in.")
        })

        const { Sern } = require("@sern/handler")

        Sern.init({
            client: this,
            defaultPrefix: 'k!',
            commands: 'src/commands'
        })

        this.login(process.env.TOKEN)
        return this
    }
}

