const { logExceptInTest } = require('../helpers/index');
const Timer = require('../models/timer');

module.exports = (http) => {
  const io = require('socket.io')(http);

  const broadcastUpdate = (timer) => {
    const time = timer.time;

    io.emit('update timer', time);
  };

  const createTimer = () => {
    return new Timer(broadcastUpdate);
  };

  let clientList = {};
  let timerList = [];

  timerList[0] = createTimer();

  // Socket Logic
  io.on('connection', (socket) => {
    logExceptInTest(`User ${socket.id} connected to timer 0`);
    clientList = io.sockets.clients().sockets;
    clientList[socket.id].emit('assign id', 0);
    clientList[socket.id].emit('update timer', timerList[0].time);

    // Events
    socket.on('disconnect', () => {
      logExceptInTest(`User ${socket.id} disconnected`);
      clientList = io.sockets.clients().sockets;
    });
  
    socket.on('handshake', (msg) => {
      logExceptInTest(`User ${socket.id} sez: ${msg}`);
    });

    socket.on('start timer', (timerId) => {
      logExceptInTest(`User ${socket.id} started timer ${timerId}`);
      timerList[timerId].startTimer();
    });

    socket.on('stop timer', (timerId) => {
      logExceptInTest(`User ${socket.id} stopped timer ${timerId}`);
      timerList[timerId].stopTimer();
    });
  });
};