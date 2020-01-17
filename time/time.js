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

function convertTime(input){
  let convertObj = formatInput(input);
  let temp = convertObj.initTime.split('');
  let hour;
  if(temp[temp.length-2]+temp[temp.length-1] === 'am'){
    temp.splice(-2, 2);
    hour = temp.join('');
  } else if(temp[temp.length-2]+temp[temp.length-1] === 'pm'){
    temp.splice(-2, 2);
    hour = parseInt(temp.join('')) + 12;
  }
  let initMoment = moment().tz(zones.get(convertObj.initZone)).hour(hour);
  convertObj.endTime = moment().tz(zones.get(convertObj.initZone)).hour(hour);
  convertObj.endTime.tz(zones.get(convertObj.endZone));

  return formatTime(convertObj.endTime, initMoment);
}

function formatInput(input){
  let splitInput = input.split(' ');
  // [0] will be the command, eg. `tz`, and
  // [3] will be "to", which just makes it more like English
  return {
    initTime: splitInput[1],
    initZone: splitInput[2].toLowerCase(),
    endTime: null,
    endZone: splitInput[4].toLowerCase()
  }
}

function formatTime(endTime, initTime){
  // I want to have this include the day, hour, and minutes eventually;
  // also eventually have an option to use 24h time
  // for now, just the hour with am/pm!
  let msg = endTime.format('ha');
  if(dayInMS(endTime) < dayInMS(initTime)){
    msg += " the day before";
  } else if(dayInMS(endTime) > dayInMS(initTime)){
    msg += " the next day";
  }

  return msg;
}

function dayInMS(value){
  let temp = value.hour(0).minute(0).second(0).millisecond(0)//.valueOf();
  return temp.valueOf();
}

module.exports = {
  convertTime
}