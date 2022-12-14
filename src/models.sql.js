const { sequelize }= require("./client")
const { Sequelize, DataTypes } = require("sequelize")

module.exports.Message = sequelize.define('messages', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    messageCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
})

module.exports.TestChannels = sequelize.define('channels', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        unique: false,
    }
})

module.exports.GuildSettings = sequelize.define('guildssettings', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    messageCounts: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    warnsData: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports.UserData = sequelize.define('CountMessages', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        primaryKey: false
    },
    guildId: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    warns: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

module.exports.GuildData = sequelize.define('guilddata', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    userdata: {
        type: Sequelize.ARRAY(DataTypes.JSON),
        allowNull: true,
    }
})
