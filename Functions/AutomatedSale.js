const getsale = require('./GetSale');
var timerset = false;

   module.exports = async function AutomatedSale(message) {

    if (timerset == false) {
        var test = await getsale();
        timerset = true;
        interval = setInterval(async function () {
            test = await getsale();
            var random = Math.floor(Math.random() * 1000);
            message.channel.startTyping();
            message.channel.send('Divinity 2 is ' + test + ". Number of the day" + random);
            message.channel.stopTyping();
            timerset = true;
        }, 43200000);
    }
};


