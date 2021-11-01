const Discord = require('discord.js');
const client = new Discord.Client();


module.exports = async function CheckInvestments(message,messagetosend,userid) {
    await client.login('NzgzMTkzMzYwMjgxMTA4NTMx.X8XLqA.SVSxfCYshbiE9ih1TtqAxyappUk');
    await client.users.fetch(userid,false).then((user)=>{
        user.send(messagetosend);
    })
}