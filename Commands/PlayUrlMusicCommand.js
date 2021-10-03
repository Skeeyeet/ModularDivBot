const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = async function PlayUrlMusic(message,link) {
    console.log(link);
    var name = await ytSearch(link);
    name = name.all[0];
    const voiceChannel = message.member.voice.channel;
    const connection = await voiceChannel.join();
    if (!voiceChannel) return message.channel.send('not in a channel');
    if (!link.length) return message.channel.send('link is to short');
    const video = name;
    if (video){
        const stream = ytdl(video.url,{filter:'audioonly'});
        connection.play(stream, {seek:0,volume:0.5})
        .on('finish',()=>{
            voiceChannel.leave();
        });
        await message.reply('Playing: ' + video.title);
    }
}