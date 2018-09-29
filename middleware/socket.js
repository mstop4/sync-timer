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
    logExceptInTest(`New Timer ${id} created`);
    return id;
  };

  const deleteTimer = (timerList, id) => {
    if (Object.keys(timerClientsList).includes(id)) {
      delete timerClientsList[id];
    } else {
      logExceptInTest(`Warning: Timer ${id} not found in timerClientsList`);
    }

    if (timerList.hasOwnProperty(id)) {
      delete timerList[id];
      logExceptInTest(`Timer ${id} deleted`);
    } else {
      logExceptInTest(`Warning: Timer ${id} not found`);
    }
  }

  const addClientToTimer = (clientId, timerId) => {
    if (!timerList.hasOwnProperty(timerId)) {
      logExceptInTest(`Warning: Timer ${timerId} not found.`);
      return false;
    }

    else if (!clientList.hasOwnProperty(clientId)) {
      logExceptInTest(`Warning: User ${clientId} not found.`);
      return false;
    }

    else {
      if (Object.keys(timerClientsList).includes(timerId)) {
        timerClientsList[timerId].push(clientId);
      } else {
        timerClientsList[timerId] = [clientId];
      }

      logExceptInTest(`User ${clientId} added to Timer ${timerId}`);
      return true;
    }
  }

  const removeClientFromTimer = (clientId, timerId) => {
    if (!timerList.hasOwnProperty(timerId)) {
      logExceptInTest(`Warning: Timer ${timerId} not found.`);
      return false;
    }

    else if (!clientList.hasOwnProperty(clientId)) {
      logExceptInTest(`Warning: User ${clientId} not found.`);
      return false;
    }

    else {
      if (timerClientsList[timerId].includes(clientId)) {
        timerClientsList[timerId].splice(timerClientsList.indexOf(clientId), 1);
        return true;
      } else {
        logExceptInTest(`Warning: User ${clientId} not found with Timer ${timerId}.`);
        return false;
      }
    }
  }

  const removeClientFromAnyTimer = (clientId) => {
    if (!clientList.hasOwnProperty(clientId)) {
      logExceptInTest(`Warning: User ${clientId} not found.`);
      return false;
    }

    else {
      for (let timerId in timerClientsList) {
        if (timerClientList[timerId].includes(clientId)) {
          removeClientFromTimer(clientId, timer);
          return true;
        }
      }

      logExceptInTest(`Warning: Orphaned User ${clientId} found.`);
      return false;
    }
  }

  let clientList = {};
  let timerList = {};
  let timerClientsList = {};

  // Socket Logic
  io.on('connection', (socket) => {
    clientList = io.sockets.clients().sockets;
    let timerId;

    // Add new client to timer
    if (Object.keys(timerList).length === 0) {
      timerId = createTimer(timerList);
    } else {
      timerId = Object.keys(timerList)[0];
    }

    addClientToTimer(socket.id, timerId); 
    clientList[socket.id].emit('assign id', timerId);

    // Events
    socket.on('disconnect', () => {
      logExceptInTest(`User ${socket.id} disconnected`);
      removeClientFromAnyTimer(socket.id);
      clientList = io.sockets.clients().sockets;
    });
  
    socket.on('get time', (timerId) => {
      logExceptInTest(`User ${socket.id} wants to know the time on Timer ${timerId}`);
      socket.emit('update timer', timerList[timerId].time);
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