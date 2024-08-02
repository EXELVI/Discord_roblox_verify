require('events').EventEmitter.prototype._maxListeners = 200;

const Discord = require('discord.js');
const client = require('./client.js');

const manager = require('./manager.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

//Commands
client.commands = new Discord.Collection();
const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

//Events
const eventsFolders = fs.readdirSync('./events');
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventsFiles) {
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}


const databasePromise = require('./db.js');
databasePromise.then(() => {
    console.log("🔌 Connected to the database")
}).catch(err => {
    console.error(err)
})

var app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}));
app.options('*', cors());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(cookieParser());


router.get("/get/:userID", async (req, res) => {
    var user = req.params.userID;
    const db = (await databasePromise).db("roblox");
    var user = await db.collection("users").findOne({ userID: user });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);

});

router.post("/verify", async (req, res) => {
    var user = req.body.userID;
    
    const db = (await databasePromise).db("roblox");
    var user = await db.collection("users").findOne({ userID: user });
    if (!user) return res.status(404).json({ error: "User not found" });
    
    db.collection("users").updateOne({ userID: user.userID }, { $set: { verified: true } });
    res.json({ success: true });
});


app.use(router, "/database");



var httpServer = http.createServer(app);
var httpsServer = https.createServer({
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.crt')
}, app);

httpServer.listen(port, () => {
    console.log('HTTP Server running on port ' + port)
});

httpsServer.listen(port2, () => {
    console.log('HTTPS Server running on port ' + port2)
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
});