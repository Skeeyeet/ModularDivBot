const AutomatedSale = require("./Functions/AutomatedSale");
const State = require('./Commands/StateCommand');
const HelpCommand = require('./Commands/HelpCommand');
const PlayMusicCommand = require("./Commands/PlayMusicCommand");
const PlayUrlMusic = require('./Commands/PlayUrlMusicCommand');
const Leave = require('./Commands/LeaveChannel');
const MusicHandler = require('./Commands/MusicHandler');
const prefix = '-';

const commands = {
    state:function(message,args){
        State(message);
    },
    help:function(message,args){
        HelpCommand(message);
    },
    play:async function(message,args){
        args = args.join('');
        var video = await PlayMusicCommand(message,args);
    },
    playurl:function(message,args){
        PlayUrlMusic(message,args[0]);
    },
    leave:function(message,args){
        Leave(message);
    },
    test:function(message,args){
        message.channel.send("testing");
    }
}

module.exports = async function CommandHandler(message) {

    AutomatedSale(message);

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    commands[command](message,args);

}