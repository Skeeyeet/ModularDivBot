const AutomatedSale = require("./Functions/AutomatedSale");
const State = require('./Commands/StateCommand');
const HelpCommand = require('./Commands/HelpCommand');
const PlayMusicCommand = require("./Commands/PlayMusicCommand");
const PlayUrlMusic = require('./Commands/PlayUrlMusicCommand');
const Leave = require('./Commands/LeaveChannel');
const MusicHandler = require('./Commands/MusicHandler');
const AddInvest = require('./Commands/AddInvestCommand');
const prefix = '-';
const CheckInvestment = require('./Functions/CheckInvestments');
const ListAllInvest = require('./Commands/ListAllInvestCommand');

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
    },
    addinvest:async function(message,args){
        await AddInvest(message,args);
    },
    listallinvest:async function(message,args){
        await ListAllInvest(message,args);
    }
}

module.exports = async function CommandHandler(message) {

    AutomatedSale(message);
    CheckInvestment(message);
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    commands[command](message,args);

}