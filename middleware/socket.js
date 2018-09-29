'use strict';

const { logExceptInTest } = require('../helpers/index');
const RoomManager = require('./roomManager.js')

module.exports = (http) => {
  const io = require('socket.io')(http);

  const broadcastUpdate = ((timer) => {
    const time = timer.time;

    io.emit('update timer', time);
  }).bind(this);

  const rm = new RoomManager(broadcastUpdate);

  // Socket Logic
  io.on('connection', (socket) => {
    rm.addClient(socket.id);
    let timerId;

    // Add new client to timer
    if (Object.keys(rm.timerList).length === 0) {
      timerId = rm.createTimer(rm.timerList);
    } else {
      timerId = Object.keys(rm.timerList)[0];
    }

    rm.addClientToTimer(timerId, socket.id); 
    socket.emit('assign id', timerId);

    // Events
    socket.on('disconnect', () => {
      logExceptInTest(`User ${socket.id} disconnected`);
      rm.removeClient(socket.id);
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
  });
};