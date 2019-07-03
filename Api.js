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
              this.HighestMMR(body, (mmr) => {
                callback(mmr);
              });
            }
              
          });
        } else if (server !== undefined && race === undefined) { // b is undefined
            this.request('http://sc2unmasked.com/API/Player?q=' + profile + '&server=' + server, { json: true }, (err, res, body) => {
            if (err) { console.log(err); }
            if(body !== undefined){
              this.HighestMMR(body, (mmr) => {
                callback(mmr);
              });
            }
          });
        } else if (server !== undefined && race !== undefined) { // both have values
            this.request('http://sc2unmasked.com/API/Player?q=' + profile + '&server=' + server + '&race=' + race, { json: true }, (err, res, body) => {
            if (err) { console.log(err); }
            if(body !== undefined){
              this.HighestMMR(body, (mmr) => {
                callback(mmr);
              });
            }
          });
        }
    }

    async HighestMMR(data, callback){
      var mmr = 0;
      for (var i = 0; i < data.players.length; i++){
          if(data.players[i].mmr > mmr){
              mmr = data.players [i].mmr;
          }
      }
      callback(mmr);
  }

}

module.exports = new Api();