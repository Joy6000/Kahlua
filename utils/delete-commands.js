//____USAGE IS RARE____//

const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken("TotallyARealToken");


rest.delete(Routes.applicationCommand("MyClientID", 'TheCommandId'))
    .then(() => console.log('Successfully deleted application command'))
    .catch(console.error);

//____USAGE IS RARE____//
