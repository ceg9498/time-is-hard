require('dotenv').config();
const fs = require('fs');

const config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./bot/commands').filter((file) => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

function runBot(){
  console.log(process.cwd())
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', message => {
    const args = message.content.slice(config.prefix.length).split(/\s+/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((c)=> c.aliases && c.aliases.includes(commandName));

    if(!command) return;
    if(command.ownerOnly && process.env.OWNER_ID !== message.author.id){
      message.channel.send("Only the bot's owner may use this command.");
    }

    try {
      command.execute(message, args);
    } catch(err) {
      console.error(err);
      message.reply("There was an error when handling your command input.");
    }
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
}

module.exports = {
  runBot
}