module.exports = {
    name: 'server',
    guildOnly: true,
    description: 'Shows server info.',
    execute(message, args) {
          message.channel.send("**Guild name:** " + message.guild.name + "\n**Total members:** " + message.guild.memberCount);
    },
};
