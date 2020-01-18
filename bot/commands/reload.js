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
      message.channel.send(`${commandName} does not exist; will attempt to load`);
      loadFile(message, commandName, "load");
      return;
    }
    delete require.cache[require.resolve(`./${command.name}.js`)];
    loadFile(message, command.name, "reload");
  }
}

function loadFile(message, cName, loadType){
  try {
    const newCommand = require(`./${cName}.js`);
    message.client.commands.set(newCommand.name, newCommand);
    message.channel.send(`Successfully ${loadType}ed command: ${newCommand.name}`);
  } catch(err) {
    console.error(err);
    message.channel.send(`There was an error when attempting to ${loadType} ${cName}`);
  }
}