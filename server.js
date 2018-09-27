require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const logger = require('morgan');
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

// Setup
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.static('views'));

// Routes
const index = require('./routes/index');

app.use('/', index);

// Socket
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);


  socket.on('disconnect', (socket) => {
    console.log(`User ${socket.id} disconnected`);
  });

  socket.on('handshake', (msg) => {
    console.log(`User ${socket.id} sez: ${msg}`);
  });
});

http.listen(port, () => console.log(`🕒  Sync Timer listening on port ${port}`));