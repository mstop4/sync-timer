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
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
});

http.listen(port, () => console.log(`🕒  Sync Timer listening on port ${port}`));