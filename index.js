// init express
const express = require("express");
const app = express();

// import bot
const bot = require('./bot/bot.js');

app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

bot.runBot();

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
