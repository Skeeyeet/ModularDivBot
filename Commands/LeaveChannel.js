module.exports = async function LeaveChannel(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("Need to be in a channel to leave from user perspective");
    await voiceChannel.leave();
    message.channel.send("bye bye");
}