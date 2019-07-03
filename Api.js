class Api{
    
    constructor(){
        this.request = require('request');
        this.Player = require('./Player.js')
    }
    
    // Need to filter Ratings by highest, need to allow callback with less than 4 parameters properly.
    async GetProfile(profile, server, race, callback){
        if (server === undefined && race === undefined) { // a, b are undefined
            this.request('http://sc2unmasked.com/API/Player?q=' + profile, { json: true }, (err, res, body) => {
            if (err) { console.log(err); }
            if(body !== undefined){
              this.HighestMMR(body, (player) => {
                callback(player);
              });
            }
              
          });
        } else if (server !== undefined && race === undefined) { // b is undefined
            this.request('http://sc2unmasked.com/API/Player?q=' + profile + '&server=' + server, { json: true }, (err, res, body) => {
            if (err) { console.log(err); }
            if(body !== undefined){
              this.HighestMMR(body, (player) => {
                callback(player);
              });
            }
          });
        } else if (server !== undefined && race !== undefined) { // both have values
            this.request('http://sc2unmasked.com/API/Player?q=' + profile + '&server=' + server + '&race=' + race, { json: true }, (err, res, body) => {
            if (err) { console.log(err); }
            if(body !== undefined){
              this.HighestMMR(body, (player) => {
                callback(player);
              });
            }
          });
        }
    }

    async HighestMMR(data, callback){
      var name, race, mmr = 0, league, server;
      var player;
      for (var i = 0; i < data.players.length; i++){
          if(data.players[i].mmr > mmr){
            name = data.players[i].display_name;
            race = data.players[i].race;
            mmr = data.players[i].mmr;
            league = data.players[i].league;
            server = data.players[i].server;
            player = new this.Player(name, race, mmr, league, server);
          }
      }
      callback(player);
  }

}

module.exports = new Api();