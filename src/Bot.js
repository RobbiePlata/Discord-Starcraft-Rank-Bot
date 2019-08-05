const ClientHolder = require('./ClientHolder');
const Config = require('./Config.json');
const api = require('./Api');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const env = require('dotenv').config();
const token = process.env.TOKEN;

var client;
ClientHolder.init(token);
var client = ClientHolder.getClient();

// Host Application and optionally render html page
if(Config.Heroku.url !== null || Config.Heroku.url !== ""){
    express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render(Config.Heroku.index))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
}

// Ping Heroku to not time it out (Needed for free heroku server use)
var http = require("http");
setInterval(function() {
    if(Config.Heroku.url !== null || Config.Heroku.url !== ""){
        http.get(Config.Heroku.url);   
    }
}, 300000); // every 5 minutes (300000)

// Listen
client.on('ready', () => {
    console.log("Bot connected");
    client.guilds.forEach((guild) => {
        console.log(guild.name);
    });
});

// Message Detection and Reply
client.on('message', (msg) => {
    var message = msg.content.split(' ');
    console.log("#" + msg.guild.name + " User: " + msg.author.username + ": " + message.join(" "));
    if (message[0] === '!mmr'){
        console.log("Server: " + msg.guild.name + " #" + msg.channel.name + "Server count: " + client.guilds.size);
        if(message.length === 1){
            (async() => {
                api.GetProfile(msg.author.username, message[2], message[3], (player) => {
                    msg.channel.send(player.toString());
                }); 
            })();
        }
        if(message.length >= 2){
            (async() => {
                api.GetProfile(message[1], message[2], message[3], (player) => {
                    msg.channel.send(player.toString());
                }); 
            })();
        }
    }
});