const ClientHolder = require('./ClientHolder');
const Config = require('./Config.json');
const token = Config.Discord.Token;
const api = require('./Api');

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var client;
ClientHolder.init(token);
var client = ClientHolder.getClient();


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  var https = require("https");
  setInterval(function() {
      http.get("http://discord-mmr-bot.herokuapp.com/");   
  }, 300000); // every 5 minutes (300000)

client.on('ready', () => {
    console.log("Bot connected");
}); 

client.on('message', (msg) => {
    var message = msg.content.split(' ');
    console.log(msg.channel.name);
    console.log(message.join(" "));
    if (message[0] === '!mmr'){
        if(message.length === 1){
            client.channels.find(x => x.name === msg.channel.name).send("Search using !mmr name server race");
        }
        if(message.length >= 2){
            (async() => {
                api.GetProfile(message[1], message[2], message[3], (player) => {
                    client.channels.find(x => x.name === msg.channel.name).send(player.toString());
                }); 
            })();
        }
    }
});