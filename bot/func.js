// config bot
const config = require('./config.json');

// import time functionality
const time = require('../time/time.js');

let commands = new Map([
  [`${config.prefix}timezone`, time.convertTime],
  [`${config.prefix}tz`, time.convertTime]
])

function processMessage(msg){
  if (msg.content.startsWith(config.prefix)) {
    sendMessage(msg.channel, commands.get(msg.content.split(' ')[0])(msg.content));
  }
}

function sendMessage(channel, message){
  channel
    .send(message)
    .catch((err)=> {
      console.error("error sending message!,",err);
    });
}

module.exports = {
  processMessage
}