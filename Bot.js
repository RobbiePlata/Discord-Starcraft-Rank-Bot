const ClientHolder = require('./ClientHolder');
const Config = require('./Config.json');
const token = Config.Discord.Token;
const api = require('./Api');

var client;
ClientHolder.init(token);
var client = ClientHolder.getClient();


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
                api.GetProfile(message[1], message[2], message[3], (mmr) => {
                    client.channels.find(x => x.name === msg.channel.name).send(mmr);
                });
            })();
            
        }
    }
});