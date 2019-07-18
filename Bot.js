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

// Host Application and optionally render html page
if(Config.Heroku.url !== null || Config.Heroku.url !== ""){
    express()
    //.use(express.static(path.join(__dirname, 'public')))
    .set('pages', path.join(__dirname, 'pages'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render(Config.Heroku.index))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
}

// Ping Heroku to not time it out (Needed for free heroku server use)
var http = require("https");
setInterval(function() {
    if(Config.Heroku.url !== null || Config.Heroku.url !== ""){
        http.get(Config.Heroku.url);   
    }
}, 300000); // every 5 minutes (300000)

// Listen
client.on('ready', () => {
    console.log("Bot connected");
}); 

// Message Detection
client.on('message', (msg) => {
    var message = msg.content.split(' ');
    console.log(msg.channel.name);
    console.log(msg.author.username);
    console.log(message.join(" "));
    if (message[0] === '!mmr'){
        if(message.length === 1){
            (async() => {
                api.GetProfile(msg.author.username, message[2], message[3], (player) => {
                    client.channels.find(x => x.name === msg.channel.name).send(player.toString());
                }); 
            })();
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