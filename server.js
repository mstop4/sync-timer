require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const logger = require('morgan');

const port = process.env.PORT || 3000;

// Setup
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.static('views'));

// Routes
const index = require('./routes/index');
app.use('/', index);

// Socket
require('./middleware/socket')(http);

http.listen(port, () => console.log(`🕒  Sync Timer listening on port ${port}`));