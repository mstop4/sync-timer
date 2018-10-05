'use strict';

const { logExceptInTest } = require('../helpers/index');

module.exports = (http, roomManager) => {
  const io = require('socket.io')(http);
  const rm = roomManager;

  const broadcastUpdate = ((timer) => {
    const time = timer.time;

    io.to(timer.id).emit('update timer', time);
  }).bind(this);

  rm.updateCallback = broadcastUpdate;

  // Socket Logic
  io.on('connection', (socket) => {
    logExceptInTest(`User ${socket.id} connected`);

    // Events
    socket.on('set up', (timerId) => {
      const tId = timerId ? timerId : rm.createTimer();

      socket.join(tId, () => {
        rm.addClient(socket.id);
        rm.addClientToTimer(tId, socket.id);
        logExceptInTest(`User ${socket.id} registered`);
        io.to(tId).emit('new user joining', { clientId: socket.id });
        socket.emit('done set up', { timerId: tId });
      });
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