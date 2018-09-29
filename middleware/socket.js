'use strict';

const { logExceptInTest } = require('../helpers/index');
const Timer = require('../models/timer');

module.exports = (http) => {
  const io = require('socket.io')(http);

  const broadcastUpdate = (timer) => {
    const time = timer.time;

    io.emit('update timer', time);
  };

  const createTimer = (timerList) => {
    const id = "12345";
    const timer = new Timer(broadcastUpdate);
    timerList[id] = timer;
    return id;
  };

  const deleteTimer = (timerList, id) => {
    if (timerList.hasOwnProperty(id)) {
      delete timerList[id];
    }
  }

  let clientList = {};
  let timerList = {};

  let tid = createTimer(timerList);

  // Socket Logic
  io.on('connection', (socket) => {
    logExceptInTest(`User ${socket.id} connected to timer ${tid}`);
    clientList = io.sockets.clients().sockets;
    clientList[socket.id].emit('assign id', tid);

    // Events
    socket.on('disconnect', () => {
      logExceptInTest(`User ${socket.id} disconnected`);
      clientList = io.sockets.clients().sockets;
    });
  
    socket.on('handshake', (msg) => {
      logExceptInTest(`User ${socket.id} sez: ${msg}`);
      socket.emit('update timer', timerList[tid].time);
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