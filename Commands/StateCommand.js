const getsale = require('../Functions/GetSale');

module.exports = async function CommandHandler(message) {
    var extrastring = await getsale();
    var random = Math.floor(Math.random() * 100);
    message.channel.startTyping();
    message.channel.send('Divinity 2 is ' + extrastring + ". Number of the day" + random);
    message.channel.stopTyping();
}