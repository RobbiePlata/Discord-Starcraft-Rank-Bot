const ClientHolder = require('./ClientHolder');
const Config = require('./Config.json');
const api = require('./Api');
const liquipedia = require('./Liquipedia');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const env = require('dotenv').config();
const token = process.env.TOKEN;
const mydiscordid = process.env.MYDISCORDID;
const email = process.env.EMAIL;

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
const Liquipedia = require('./Liquipedia');
setInterval(function() {
    if(Config.Heroku.url !== null || Config.Heroku.url !== ""){
        http.get(Config.Heroku.url);   
    }
}, 300000); // every 5 minutes (300000)


// Listen
client.on('ready', () => {
    console.log("Bot connected");
    client.user.setStatus("available");
    NewPresence();
});

setInterval(() => {
    NewPresence();
}, 1000 * 60 * 60 * (1/6) / 10);

function NewPresence(){
    liquipedia.GetNewMatchup((result) => {
        if (result){
            client.user.setPresence({
                activity: {
                    name: liquipedia.tournamentname + '\n' + liquipedia.matchup + '\n' + "!link",
                    type: "WATCHING",
                    url: liquipedia.url
                }
            });
        }
        else{
            client.user.setPresence({
                activity: {
                    name: client.guilds.size + " servers",
                    type: "WATCHING"
                }
            });
        }
    });
}

// Message Detection and Reply
client.on('message', (msg) => {
    var message = msg.content.split(' ');
    if (message[0] === '!mmr' && msg.channel.type !== "dm"){
        if(msg.guild === undefined) {
            console.log("#" + msg.guild.name + " " + msg.author.username + ": " + message.join(" "));
        }
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
    if ((message[0] === "!link")){
        if (liquipedia.matchup !== undefined){
            msg.channel.send(Liquipedia.matchup + ' in ' + Liquipedia.tournamentname + '\n' + liquipedia.url);
        }
    }
        
});

client.on("guildCreate", guild => {
    try{
        guild.owner.send('Thanks for welcoming me to ' + guild.name + '!' + '\n' + 'To use me to the best of my capability type !mmr <name> <server> <race>' + '\n' + 'To keep me running and maintained please consider making a small donation to cover the cost of the server and maintenance! Thank you.\n' + `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${email}&item_name=Server+time&currency_code=USD`);
    } catch(err) { console.log(err) }
});
