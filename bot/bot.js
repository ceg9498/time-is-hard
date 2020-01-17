// init dotenv
require('dotenv').config();

// import deep bot functionality
const bot = require('./func.js');

// DISCORD STUFF START
const Discord = require('discord.js');
const client = new Discord.Client();

function runBot(){
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', msg => {
    bot.processMessage(msg);
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
}

module.exports = {
  runBot
}