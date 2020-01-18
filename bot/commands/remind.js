const moment = require('moment-timezone');
const {zones} = require('../zones');

module.exports = {
  name: 'remind',
  description: 'Sends you a reminder',
  usage: '\`!remind time:[time] message:[message] tags:[users, roles]\`',
  execute(message, args){
    msg = [];
    msg.push("Note: this command is a work in progress");
    msg.push("Your reminder will be lost when the bot is restarted");
    msg.push(parseReminder(args));
    message.channel.send(msg);
  }
}

const reminders = [];

function parseReminder(args){
  let res = '';
  let matches = args.join(' ').match(/(?<time>time:.*)(?<message>message:.*)(?<tags>tags:.*)/);
  let tags = matches.groups.tags.replace("tags:","").trim();
  let time = matches.groups.time.replace("time:","").trim();
  let message = matches.groups.message.replace("message:","").trim();
  res += "Okay, I'll remind " + tags + " at " + time;
  res += " about \"" + message + "\".";
  matches = time.match(/(?<hour>\d{1,2})\s*(?<ampm>(am|pm))\s*(?<zone>[a-z]*)\s*(?<day>(Sun|Mon|Tue|Wed|Thu|Fri|Sat)[a-z]*day)/);
  let mTime = moment().tz(zones.get(matches.groups.zone));
  if(matches.groups.ampm === "pm") matches.groups.hour = parseInt(matches.groups.hour) + 12;
  mTime.hour(matches.groups.hour);
  mTime.day(matches.groups.day);
  reminders.push({
    next: mTime.valueOf(),
    repeat: false,
    baseTime: time,
    tags: tags,
    message: message
  });
  console.log(reminders[reminders.length-1]);
  return res;
}

/**
 * reminder = {
 *  next: <time in ms>,
 *  repeat: boolean,
 *  baseTime: string,
 *  tags: string,
 *  message: string
 * }
 */