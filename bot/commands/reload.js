module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  execute(message, args){
    if(!args.length) {
      return message.channel.send(`You didn't include a command to reload, ${message.author}!`);
    }
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName) 
      || message.client.commands.find(c => c.aliases && c.aliases.includes(commandName));
    if(!command){
      return message.channel.send(`${commandName} does not exist`);
    }
    delete require.cache[require.resolve(`./${commandName}.js`)];
    try {
      const newCommand = require(`./${commandName}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Successfully reloaded command: ${commandName}`);
    } catch(err) {
      console.error(err);
      message.channel.send(`There was an error when attempting to reload ${commandName}`);
    }
  }
}