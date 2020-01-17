const config = require('../config.json');

module.exports = {
  name: 'help',
  aliases: ['commands'],
  description: 'List of all my commands, or more info about a specific command',
  ownerOnly: false,
  execute(message, args){
    if(!args.length){
      const msg = [];
      // general help command
      msg.push("Here's a list of the available commands:");
      msg.push(message.client.commands.filter((command)=>{
        if(!command.ownerOnly) return command;
      }).map((command)=>"`!" +command.name + "`: " + command.description).join('\n'));
      msg.push(`You can also send \`${config.prefix}help [command name]\` for more info about a specific command.`);
      return message.channel.send(msg);
    }
    const name = args[0].toLowerCase();
    const command = message.client.commands.get(name) || message.client.commands.find(c=>c.aliases && c.aliases.includes(name));
    if(!command){
      return message.reply(`${name} is not a valid command.`);
    }
    const msg = [];
    msg.push(`**Name:** ${command.name}`);
    if(command.aliases){
      msg.push(`**Aliases:** ${command.aliases.join(', ')}`);
    }
    if(command.description){
      msg.push(`**Description:** ${command.description}`);
    }
    if(command.usage){
      msg.push(`**Usage:** ${command.usage}`);
    }

    message.channel.send(msg);
  }
}