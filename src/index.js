const fs = require('fs');
const Discord = require("discord.js");
const { prefix, token, logbotchannel } = require('../config.json');

const TOKEN = token; //BOT Token.
const LOGBOT_CHANNEL = logbotchannel; //Default log print channel.

var client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

//Bot onReady message.
client.on("ready", () => {
  console.log("[BOT-INFO] Logged in as " + client.user.tag + "!");
  client.user.setActivity('Use !help');
});

//Bot message.
client.on("message", (message) => {
  console.log("G: [" + message.guild + "] - " + message.author.username + ": " + message.content);
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
    }


    try {
        command.execute(message, args, client);
    }
    catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
});

//User Join or Leave voice channel.
client.on("voiceStateUpdate", (member) => {
        console.log("[INFO: Voice Status Update.]");
        const channel = member.guild.channels.find('name', LOGBOT_CHANNEL);
        if (!channel) {
            console.log("[BOT-WARNING] - There is not a channel named: " + LOGBOT_CHANNEL + ". You can change the default log channel in the config.json");
            return;
        }
        channel.send("Test.");
});





client.login(TOKEN);
