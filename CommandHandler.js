const AutomatedSale = require("./Functions/AutomatedSale");
const State = require('./Commands/StateCommand');
const HelpCommand = require('./Commands/HelpCommand');
const MusicHandler = require('./Commands/MusicHandler');
const AddInvest = require('./Commands/AddInvestCommand');
const prefix = '-';
const CheckInvestment = require('./Functions/CheckInvestments');
const ListAllInvest = require('./Commands/ListAllInvestCommand');
const RemoveInvestCommand = require("./Commands/RemoveInvestCommand");

const commands = {
    state: function (message, args) {
        State(message);
    },
    help: function (message, args) {
        HelpCommand(message);
    },
    play: async function (message, args) {
        args = args.join('');
        await MusicHandler.play(message, args);
    },
    leave: function (message, args) {
        MusicHandler.leave(message);
    },
    test: async function (message, args) {
        message.channel.send("testing");
        CheckInvestment(message);
    },
    addinvest: async function (message, args) {
        await AddInvest(message, args);
    },
    listallinvest: async function (message, args) {
        await ListAllInvest(message, args);
    },
    removeinvest: async function (message, args) {
        await RemoveInvestCommand(message, args);
    }
}



module.exports = async function CommandHandler(message) {

    AutomatedSale(message);

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    commands[command](message, args);

}