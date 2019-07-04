class Player{
    constructor(name, race, mmr, league, server){
        this.name = name;
        this.race = race;
        this.mmr = mmr;
        this.league = league;
        this.server = server;

        
    }

    GetName(){
        return this.name;
    }

    GetRace(){
        return this.race;
    }

    GetMMR(){
        return this.mmr;
    }

    GetLeague(){
        return this.league;
    }

    GetServer(){
        return this.server;
    }

    toString(){
        return this.GetName() + ' ' + this.GetRace().toUpperCase() + ' ' + this.GetServer().toUpperCase() + ' ' + this.GetMMR() + ' MMR';
    }
    
}

module.exports = Player;