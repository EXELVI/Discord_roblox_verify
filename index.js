require('dotenv').config()


const Discord = require('discord.js');
const manager = require('./manager.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

var app = express();
const router = express.Router();

app.use(apiPrefix, router);

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