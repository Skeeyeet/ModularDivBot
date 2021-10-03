const Discord = require('discord.js');
const client = new Discord.Client();
const CommandHandler = require('./CommandHandler');

client.on('message',CommandHandler)

client.login('NzgzMTkzMzYwMjgxMTA4NTMx.X8XLqA.SVSxfCYshbiE9ih1TtqAxyappUk');
//client.login(process.env.token);
