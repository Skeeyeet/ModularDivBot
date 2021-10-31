const PlayMusicCommand = require("./PlayMusicCommand");
const PlayUrlMusic = require('./PlayUrlMusicCommand');

module.exports = async function CommandHandler(message,args,command) {

switch(command){
    case play:

    case playurl:

    default:
        message.channel.send("error inside music handler js");
}

}