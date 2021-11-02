const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();

module.exports = async function CheckInvestments(message,messagetosend,userid) {
    await client.login(process.env.DISCORDBOT);
    try{
        await client.users.fetch(userid,false).then((user)=>{
            user.send(messagetosend);
        })
    }
    catch{

    }
}