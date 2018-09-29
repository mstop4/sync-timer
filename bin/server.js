'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const RoomManager = require('../middleware/roomManager');

const server = (port) => {
  
  // Setup
  if (process.env.NODE_ENV !== 'test') {
    const logger = require('morgan');
    app.use(logger('dev'));
  }
  
  app.use(express.static('public'));
  app.use(express.static('views'));

  const rm = new RoomManager();

  // Routes
  const index = require('../routes/index')(rm);
  app.use('/', index);

  // Socket
  const socket = require('../middleware/socket')(http, rm);

  http.listen(port, () => console.log(`🕒  Sync Timer listening on port ${port}`));
  return http;
};

module.exports = server;