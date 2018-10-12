'use strict';

const { logExceptInTest } = require('../helpers');

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
      // A failsafe to make sure a valid Timer Id is obtained at this point.
      // Being passed an invalid timerId (undefined, null) should not happen.
      const tId = timerId ? timerId : rm.createTimer();

      socket.join(tId, () => {
        rm.addClient(socket.id);
        rm.addClientToTimer(tId, socket.id);
        logExceptInTest(`User ${socket.id} registered`);
        io.to(tId).emit('new user joining', { clientId: socket.id });
        socket.emit('done set up', { timerId: tId });

        rm.timerList[tId].timerRunning 
        ? io.to(tId).emit('timer started')
        : io.to(tId).emit('timer stopped'); 
      });
    });
  
    socket.on('get time', (timerId) => {
      logExceptInTest(`User ${socket.id} wants to know the time on Timer ${timerId}`);
      socket.emit('update timer', rm.timerList[timerId].time);
    });

    socket.on('start timer', (timerId) => {
      logExceptInTest(`User ${socket.id} started timer ${timerId}`);
      rm.timerList[timerId].startTimer();
      io.to(timerId).emit('timer started');
    });

    socket.on('stop timer', (timerId) => {
      logExceptInTest(`User ${socket.id} stopped timer ${timerId}`);
      rm.timerList[timerId].stopTimer();
      io.to(timerId).emit('timer stopped');
    });

    socket.on('disconnect', () => {
      logExceptInTest(`User ${socket.id} disconnected`);
      rm.removeClient(socket.id);
    });
  });
};