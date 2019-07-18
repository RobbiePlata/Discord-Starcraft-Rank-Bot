class ClientHolder {
    
    constructor(){
        this.Discord = require('discord.js');
        this.client = null;
        this.initialized = false;
        this.token = null;
        this.accessToken = null;
    }
    
    async init(token) {
        if (this.initialized) { throw new Error('Trying to initialize again'); }
        this.client = new this.Discord.Client;
        this.client.login(token);
        this.initialized = true;
        this.token = token;
        console.log("Client Initialized");
    }

    getClient() {
        if (!this.initialized) { throw new Error("Client could not be initialized") }
        return this.client;
    }
}

module.exports = new ClientHolder();