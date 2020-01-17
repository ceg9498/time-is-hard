// import time functionality
const time = require('../../time/time.js');

module.exports = {
  name: 'timezone',
  aliases: ['tz'],
  description: "Convert time from one timezone to another",
  execute(message, args){
    message.channel.send(time.convertTime(args));
  }
}