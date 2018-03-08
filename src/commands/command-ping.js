module.exports = {
    name: 'ping',
    guildOnly: true,
    description: 'Ping!',
    execute(message, args) {
        message.channel.send('Pong.');
    },
};
