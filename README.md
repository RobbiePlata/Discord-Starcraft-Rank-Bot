<img src="https://i.imgur.com/ltUat7F.png" align="right"/>

# Discord Starcraft Rank Bot
using node.js

## Use now
https://top.gg/bot/601483933661659178

## Getting Started

### Prerequisites

* <a href="https://nodejs.org/en/" >Nodejs 12.x</a> <br>
* <a href="https://discordapp.com/developers/applications/">Discordapp Bot application</a> <br>
* Discord Channel

### Installing
In windows, open a command prompt in the directory of the bot
```
cd C:\Users\Robbie Plata\Documents\Discord-Starcraft-Rank-Bot
```
Install Node dependencies:
```
npm install
```
### Local Deployment:
1. Create a new application on discordapp.com. <br>
2. Under the Bot section, Build a new bot. <br>
3. Paste the clientid of the bot into this url between "clientid=" and "&" <br>
```
https://discordapp.com/oauth2/authorize?client_id=&scope=bot&permissions=67584
```
4. Authorize the bot under your preferred server. (Server Owner/Administrator required to add) <br>
5. Create .env file in the root folder and enter the discord bot token as TOKEN=123456789.12345789
6. Run the bot. <br>
```
Node bot.js
```

7. Deploy it straight to a heroku server

## Built With

* [Node.js](https://nodejs.org/en/)

* [sc2unmasked](https://www.sc2unmasked.com/)

## Author

* **Robert Plata** - [Robert Plata](https://github.com/robbieplata)

## Acknowledgements

* **The guy who created woos_bot**
