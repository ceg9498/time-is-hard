const moment = require('moment-timezone');

const zones = new Map([
  ['ast', 'Canada/Atlantic'],
  ['adt', 'Canada/Atlantic'],
  ['est', 'US/Eastern'],
  ['edt', 'US/Eastern'],
  ['cst', 'US/Central'],
  ['cdt', 'US/Central'],
  ['mst', 'US/Mountain'],
  ['mdt', 'US/Mountain'],
  ['arizona', 'US/Arizona'],
  ['pst', 'US/Pacific'],
  ['pdt', 'US/Pacific'],
  ['akst', 'US/Alaska'],
  ['akdt', 'US/Alaska'],
  ['alaska', 'US/Alaska'],
  ['hst', 'US/Hawaii'],
  ['hdt', 'US/Hawaii'],
  ['hawaii', 'US/Hawaii'],
  ['sanger', 'America/Guayaquil'],
  ['ect', 'America/Guayaquil'],
  ['jst', 'Japan']
]);

function convertTime(args){
  let convertObj = formatInput(args);
  let temp = convertObj.initTime.split('');
  let hour;
  if(temp[temp.length-2]+temp[temp.length-1] === 'am'){
    temp.splice(-2, 2);
    hour = temp.join('');
  } else if(temp[temp.length-2]+temp[temp.length-1] === 'pm'){
    temp.splice(-2, 2);
    hour = parseInt(temp.join('')) + 12;
  }
  let initMoment = moment().date(15).tz(zones.get(convertObj.initZone)).hour(hour);
  convertObj.endTime = moment().date(15).tz(zones.get(convertObj.initZone)).hour(hour);
  convertObj.endTime.tz(zones.get(convertObj.endZone));

  return formatTime(convertObj.endTime, initMoment);
}

function formatInput(args){
  // [2] will be "to", which just makes it more like English
  return {
    initTime: args[0],
    initZone: args[1].toLowerCase(),
    endTime: null,
    endZone: args[3].toLowerCase()
  }
}

function formatTime(endTime, initTime){
  // I want to have this include the day, hour, and minutes eventually;
  // also eventually have an option to use 24h time
  // for now, just the hour with am/pm!
  let msg = endTime.format('ha');

  if(endTime.date() < initTime.date()){
    msg += " the day before";
  } else if(endTime.date() > initTime.date()){
    msg += " the next day";
  }

  return msg;
}

module.exports = {
  name: 'timezone',
  aliases: ['tz'],
  description: "Convert time from one timezone to another",
  execute(message, args){
    message.channel.send(convertTime(args));
  }
}