const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'], });
const CommandHandler = require('./CommandHandler');
require("dotenv").config();
client.on('message', CommandHandler)




client.on('guildMemberSpeaking', async (member, speaking) => {
    /*  if (speaking) {
  
          if (speaking.bitfield = 0){
              console.log("finished speaking")
          }
  
          else if (speaking.bitfield = 1){
              console.log('still speaking')
          }
  
      } */
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    // if someone else has updated their status, just return
    if (newPresence.userId = '246807657971712002') {
        message.channel.startTyping();
        message.channel.send("Terry is online");
        message.channel.stopTyping();
    }
    // if it's not the status that has changed, just return
    //if (oldPresence.status === newPresence.status) return;
    // of if the new status is not online, again, just return
    //if (newPresence.status !== 'online') return;

});



client.login(process.env.DISCORDBOT);
