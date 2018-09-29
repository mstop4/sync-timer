'use strict';

const { logExceptInTest } = require('../helpers/index');
const Timer = require('../models/timer');

class RoomManager {
  constructor(updateCB) {
    this.clientList = [];
    this.timerList = {};
    this.timerClientsList = {};
    this.updateCallback = updateCB;

    this.removeClientFromTimer = this.removeClientFromTimer.bind(this);
    this.removeClientFromAnyTimer = this.removeClientFromAnyTimer.bind(this);
  }

  createTimer() {
    const id = '12345';
    const timer = new Timer(this.updateCallback);
    this.timerList[id] = timer;
    logExceptInTest(`New Timer ${id} created`);
    return id;
  };

  deleteTimer(timerId) {
    if (Object.keys(this.timerClientsList).includes(timerId)) {
      delete this.timerClientsList[timerId];
    } else {
      logExceptInTest(`deleteTimer: Timer ${timerId} not found in this.timerClientsList`);
    }

    if (this.timerList.hasOwnProperty(timerId)) {
      delete this.timerList[timerId];
      logExceptInTest(`Timer ${timerId} deleted`);
      return true;
    } else {
      logExceptInTest(`deleteTimer: Timer ${timerId} not found`);
      return false;
    }
  };

  addClient(clientId) {
    if (!this.clientList.includes(clientId)) {
      this.clientList.push(clientId);
      logExceptInTest(`User ${clientId} added`);
      return true;
    } else {
      logExceptInTest(`addClient: User ${clientId} already added`);
      return false;
    }
  };

  removeClient(clientId) {
    this.removeClientFromAnyTimer(clientId);

    if (this.clientList.includes(clientId)) {
      delete this.clientList[clientId];
      logExceptInTest(`User ${clientId} removed`);
      return true;
    } else {
      logExceptInTest(`removeClient: User ${clientId} not found`);
      return false;
    }
  };

  addClientToTimer(timerId, clientId) {
    if (!this.timerList.hasOwnProperty(timerId)) {
      logExceptInTest(`addClientToTimer: Timer ${timerId} not found.`);
      return false;
    }

    else if (!this.clientList.includes(clientId)) {
      logExceptInTest(`addClientToTimer: User ${clientId} not found.`);
      return false;
    }

    else {
      if (Object.keys(this.timerClientsList).includes(timerId)) {
        this.timerClientsList[timerId].push(clientId);
      } else {
        this.timerClientsList[timerId] = [clientId];
      }

      logExceptInTest(`User ${clientId} added to Timer ${timerId}`);
      return true;
    }
  };

  removeClientFromTimer(timerId, clientId) {
    if (!this.timerList.hasOwnProperty(timerId)) {
      logExceptInTest(`removeClientFromTimer: Timer ${timerId} not found.`);
      return false;
    }

    else if (!this.clientList.includes(clientId)) {
      logExceptInTest(`removeClientFromTimer: User ${clientId} not found.`);
      return false;
    }

    else {
      if (this.timerClientsList[timerId].includes(clientId)) {
        this.timerClientsList[timerId].splice(this.timerClientsList[timerId].indexOf(clientId), 1);
        return true;
      } else {
        logExceptInTest(`removeClientFromTimer: User ${clientId} not found with Timer ${timerId}.`);
        return false;
      }
    }
  };

  removeClientFromAnyTimer(clientId) {
    if (!this.clientList.includes(clientId)) {
      logExceptInTest(`removeClientFromAnyTimer: User ${clientId} not found.`);
      return false;
    }

    else {
      for (var timerId in this.timerClientsList) {
        if (this.timerClientsList[timerId].includes(clientId)) {
          return this.removeClientFromTimer(timerId, clientId);
        }
      }
    }

    logExceptInTest(`removeClientFromAnyTimer: Orphaned User ${clientId} found.`);
    return false;
  }
}

module.exports = RoomManager;