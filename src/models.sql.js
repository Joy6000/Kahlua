const { sequelize }= require("./client")
const { Sequelize } = require("sequelize")

module.exports.User = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
    }
})

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







