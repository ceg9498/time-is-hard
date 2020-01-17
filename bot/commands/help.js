module.exports = {
  name: 'help',
  aliases: ['commands'],
  description: 'List of all my commands, or more info about a specific command',
  execute(message, args){
    message.channel.send("Help has been requested, but this module is not complete! It will be in progress soon.");
  }
}