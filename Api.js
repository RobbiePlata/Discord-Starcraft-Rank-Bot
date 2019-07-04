class Api{
    
    constructor(){
        this.request = require('request');
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
      var mmr = 0;
      for (var i = 0; i < data.players.length; i++){
          if(data.players[i].mmr > mmr){
            try{
              this.Player = require('./Player')
              var name = data.players[i].display_name;
              var race = data.players[i].race;
              mmr = data.players[i].mmr;
              var league = data.players[i].league;
              var server = data.players[i].server;
              var player = new this.Player(name, race, mmr, league, server);
            } catch (ex){
              console.log(ex);
            }
          }
      }
      callback(player);
  }

}

module.exports = new Api();