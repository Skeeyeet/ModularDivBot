module.exports = async function HelpCommand(message) {
    message.channel.startTyping();
    message.channel.send("Here is a list of all the following commands (case sensative) \n state: Check's if divinity 2 is on sale \n play: Include a youtube video name to play it. Doesn't work with playlists \n leave: leaves channel playing in \n addinvest: adds a crypto investment use coin name then add a space for the price you brought at. \n listallinvest: lists all your investments");
    message.channel.stopTyping();
    //heroku test
}