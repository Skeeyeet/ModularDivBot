const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'], });
const CommandHandler = require('./CommandHandler');
require("dotenv").config();
client.on('message', CommandHandler)
const pm = require('./Functions/SendUserPrivateMessage')



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

    let idofpersononline = newPresence.userID
    let idtocheck = '246807657971712002'

        if (idofpersononline == idtocheck) {
            console.log(newPresence.status)
            if (newPresence.status === 'online'){
                const channel = await client.channels.fetch('736197116996747316')
                pm(null,'hello','254917339810627584')
            }
        }        
});



client.login(process.env.DISCORDBOT);
