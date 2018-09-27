require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const port = process.env.PORT || 3000;

// Setup
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.static('views'));

// Routes
const index = require('./routes/index');

app.use('/', index);

app.listen(port, () => console.log(`🕒  Sync Timer listening on port ${port}`));