const Discord = require('discord.js');
const client = new Discord.Client();
const CommandHandler = require('./CommandHandler');
require("dotenv").config();
client.on('message',CommandHandler)

client.login(process.env.DISCORDBOT);
