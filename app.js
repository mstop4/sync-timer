require('dotenv').config();
const server = require('./bin/server');
const port = process.env.PORT || 3000;

server(port);