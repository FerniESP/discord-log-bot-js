const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Shows help.',
    guildOnly: true,
    execute(message, args, client) {
      var embed = new Discord.RichEmbed()
      .setTitle("LogBOT help info!")
      .setColor("#003EFF")
      //.setAuthor(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(client.user.displayAvatarURL)
      .addField("Description:", "This BOT main function is create an audit log directly in a Discord text channel.")
      .addField("Commands:", "**!help:** Show this info box.\n" +
      "**!server:** Show info about the server.\n" +
      "**!ping:** Return *pong*.\n")
      .setFooter("Made with ♥ by Ferni.");

      message.channel.sendEmbed(embed);
    },
};
