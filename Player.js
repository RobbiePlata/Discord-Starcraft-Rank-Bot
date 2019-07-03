class Player{

    constructor(name, race, mmr, league, server){
        this.name = name;
        this.race = race;
        this.mmr = mmr;
        this.league = league;
        this.server = server;
    }
}

module.exports = new Player();