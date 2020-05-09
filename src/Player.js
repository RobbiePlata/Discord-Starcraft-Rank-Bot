class Player{
    constructor(profile){
        this.realm= profile.realm,
        this.region= profile.region,
        this.rank= profile.rank,
        this.username= profile.username,
        this.bnet_id= profile.bnet_id,
        this.race= profile.race,
        this.mmr= profile.mmr,
        this.wins= profile.wins,
        this.losses= profile.losses,
        this.clan= profile.clan,
        this.profile_id= profile.profile_id,
        this.alias= profile.alias;
    }

    GetName(){
        return this.username;
    }

    GetRace(){
        return this.race;
    }

    GetMMR(){
        return this.mmr;
    }

    GetLeague(){
        return this.rank;
    }

    GetServer(){
        return this.region;
    }

    toString(){
        return this.GetName() + ' '  + this.GetServer().toUpperCase() + ' ' + this.GetLeague() + ' ' + this.GetRace().toUpperCase() + ' ' + this.GetMMR() + ' MMR';
    }
    
}

module.exports = Player;
