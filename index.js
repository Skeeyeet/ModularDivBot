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

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    try {
        if (newPresence.userId === '254917339810627584') {
            console.log(newPresence.status)
            if (newPresence.status === 'online'){
                const channel = await client.channels.fetch('783212024808079384')
                channel.send('hello')
            }
        }        
    } catch (error) {
        console.log(error)
    }

});



client.login(process.env.DISCORDBOT);
