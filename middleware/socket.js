'use strict';

const { logExceptInTest } = require('../helpers/index');

module.exports = (http, roomManager) => {
  const io = require('socket.io')(http);

  const broadcastUpdate = ((timer) => {
    const time = timer.time;

    io.emit('update timer', time);
  }).bind(this);

  const rm = roomManager;
  rm.updateCallback = broadcastUpdate;

  // Socket Logic
  io.on('connection', (socket) => {

    // Events
    socket.on('set up', (timerId) => {
      const _timerId = timerId === null ? rm.createTimer() : timerId;

      rm.addClient(socket.id);
      rm.addClientToTimer(_timerId, socket.id);
      logExceptInTest(`User ${socket.id} registered`);
      socket.emit('done set up');
    });
  
    socket.on('get time', (timerId) => {
      logExceptInTest(`User ${socket.id} wants to know the time on Timer ${timerId}`);
      socket.emit('update timer', rm.timerList[timerId].time);
    });

    socket.on('start timer', (timerId) => {
      logExceptInTest(`User ${socket.id} started timer ${timerId}`);
      rm.timerList[timerId].startTimer();
    });

    socket.on('stop timer', (timerId) => {
      logExceptInTest(`User ${socket.id} stopped timer ${timerId}`);
      rm.timerList[timerId].stopTimer();
    });

    socket.on('disconnect', () => {
      logExceptInTest(`User ${socket.id} disconnected`);
      rm.removeClient(socket.id);
    });
  });
};