const { match } = require('assert');
const https = require('https');
const zlib = require("zlib");
class Liquipedia {
    
    constructor(){
        this.player1;
        this.player2;
        this.score1;
        this.score2;
        this.tournamentname;
        this.url;
        this.matchup;
    }

    getGzipped(url, callback) {
        var buffer = [];
        https.get(url, (res) => {
            var gunzip = zlib.createGunzip();  
            res.pipe(gunzip);
        
            gunzip.on('data', (data) => {
                // decompression chunk ready, add it to the buffer
                buffer.push(data.toString())
                
            }).on("end", () => {
                // response and decompression complete, join the buffer and return
                callback(null, buffer.join("")); 
        
            }).on("error", (e) => {
                callback(e);
            })
            
        }).on('error', function(e) {
            callback(e)
        });
    }
    
    GetNewMatchup(callback) {
        /* Get Date 15 minutes ago */
        var now = new Date();
        now.setMinutes(now.getMinutes()-50);
        now = now.toUTCString().replace('GMT', "0000");
        console.log(now);   
    
        const options = {
            hostname: 'liquipedia.net',
            path: encodeURI(`/starcraft2/api.php?action=askargs&format=json&conditions=Has match date::>time:${now}|Has_exact_time::true&printouts=has player left score|has player right score|has tournament icon|has tournament name|has match date|has player left page|has player right page|has tournament|has player right|has player left&parameters=sort=has match date, Has player left page, Has player right page|order=asc|limit=1`),
            headers: { 'User-Agent': 'StarBot', 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' }
        };
    
        console.log(options.hostname + options.path);
    
        this.getGzipped(options, (err, response) => {
            if (!err) {
                try{
                    response = JSON.parse(response)
                    var results = response.query.results;
                    var key = Object.keys(results)[0];
                    var tournament = results[key];
                    var player1 = tournament.printouts["has player left"];
                    var player2 = tournament.printouts["has player right"];
                    var score1 = tournament.printouts["has player left score"];
                    var score2 = tournament.printouts["has player right score"];
                    var tournamentname = tournament.printouts["has tournament name"];
                    var url = tournament.printouts["has tournament"][0].fullurl;
                    var matchup = player1 + ' ' + score1 + '-' + score2 + ' ' + player2;
                    if(player1.length < 1 || player2.length < 1 || score1.length < 1 || score2.length < 1 || tournamentname.length < 1 || url.length < 1){
                        callback(false)
                    }
                    else{
                        this.player1 = player1;
                        this.player2 = player2;
                        this.score1 = score1;
                        this.score2 = score2;
                        this.tournamentname = tournamentname;
                        this.url = url;
                        this.matchup = matchup;
                        callback(true)
                    }
                }
                catch(ex) { console.log(ex); callback(false) }
            }
            if(err) { callback(false) };
        })
    
    }
}
module.exports = new Liquipedia();
