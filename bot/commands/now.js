const moment = require('moment-timezone');
const {zones} = require('../zones');

module.exports = {
  name: 'now',
  description: 'Gets the current time in the specified timezone',
  usage: '!now [zone]',
  execute(message, args){
    const zone = args[0];
    if(!zone){
      return message.channel.send("No zone has been selected.");
    }
    let now = moment().tz(zones.get(zone));
    message.channel.send(`Currently in ${zone} it is ${now.format("dddd")} at ${now.format("ha")}`);
  }
}