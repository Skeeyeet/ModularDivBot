module.exports = async function HelpCommand(message) {
    message.channel.startTyping();
    message.channel.send("Here is a list of all the following commands (case sensative) \n state: Check's if divinity 2 is on sale \n play: Include a youtube video name to play it. Doesn't work with playlists \n playurl: Include a youtube url to play a youtube video \n leave: leaves channel playing in");
    message.channel.stopTyping();
}