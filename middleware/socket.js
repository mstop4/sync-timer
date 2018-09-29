const { logExceptInTest, padDisplay } = require('../helpers/index');
const Timer = require('../models/timer');

module.exports = (http) => {
  const io = require('socket.io')(http);

  const broadcastUpdate = (hours, minutes, seconds) => {
    const time = {
      hours: padDisplay(hours, 2),
      minutes: padDisplay(minutes, 2),
      seconds: padDisplay(seconds, 2)
    };

    io.emit('update timer', time);
  };

  let clientList = {};
  let timerList = [];

  timerList[0] = new Timer(broadcastUpdate);

  // Socket Logic
  io.on('connection', (socket) => {
    logExceptInTest(`User ${socket.id} connected`);
    clientList[socket.id] = socket;
    //clientList[socket.id].send(timerList[0].getTime());

    // Events
    socket.on('disconnect', () => {
      logExceptInTest(`User ${socket.id} disconnected`);
      delete clientList[socket.id];
    });
  
    socket.on('handshake', (msg) => {
      logExceptInTest(`User ${socket.id} sez: ${msg}`);
    });

    socket.on('start timer', () => {
      logExceptInTest(`User ${socket.id} starts timer 0`);
      timerList[0].startTimer();
    });

    socket.on('stop timer', () => {
      logExceptInTest(`User ${socket.id} stops timer 0`);
      timerList[0].stopTimer();
    });
  });
};