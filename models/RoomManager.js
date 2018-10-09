'use strict';

const { logExceptInTest } = require('../helpers');
const Timer = require('./Timer');
const uniqid = require('uniqid');

const timerGCDelay = 5 * 60 * 1000; // 5 minutes 

class RoomManager {
  constructor() {
    this.clientList = [];
    this.timerList = {};
    this.timerGCList = {};
    this.updateCallback = null;

    this.deleteTimer = this.deleteTimer.bind(this);
    this.removeClientFromTimer = this.removeClientFromTimer.bind(this);
    this.removeClientFromAnyTimer = this.removeClientFromAnyTimer.bind(this);
  }

  clientExists(clientId) {
    return this.clientList.includes(clientId);
  }

  timerExists(timerId) {
    return this.timerList.hasOwnProperty(timerId);
  }

  createTimer() {
    const id = uniqid.time();
    const timer = new Timer(this.updateCallback, id);
    this.timerList[id] = timer;
    logExceptInTest(`New Timer ${id} created`);
    return id;
  };

  deleteTimer(timerId) {
    if (this.timerExists(timerId)) {
      delete this.timerList[timerId];
      logExceptInTest(`Timer ${timerId} deleted`);
      return true;
    } else {
      logExceptInTest(`deleteTimer: Timer ${timerId} not found`);
      return false;
    }
  };

  addClient(clientId) {
    if (!this.clientExists(clientId)) {
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

    if (this.clientExists(clientId)) {
      this.clientList.splice(this.clientList.indexOf(clientId), 1);
      logExceptInTest(`User ${clientId} removed`);
      return true;
    } else {
      logExceptInTest(`removeClient: User ${clientId} not found`);
      return false;
    }
  };

  addClientToTimer(timerId, clientId) {
    if (!this.timerExists(timerId)) {
      logExceptInTest(`addClientToTimer: Timer ${timerId} not found.`);
      return false;
    }

    else if (!this.clientExists(clientId)) {
      logExceptInTest(`addClientToTimer: User ${clientId} not found.`);
      return false;
    }

    else {
      const result = this.timerList[timerId].addClient(clientId);
      if (result) {
        logExceptInTest(`User ${clientId} added to Timer ${timerId}`);

        if (this.timerGCList[timerId]) {
          clearInterval(this.timerGCList[timerId]);
          this.timerGCList[timerId] = null;
          logExceptInTest(`Unmark Timer ${timerId} from deletion`);
        }

        return true;
      } else {
        logExceptInTest(`addClientToTimer: User ${clientId} already added to Timer ${timerId}`);
        return true;        
      }
    }
  };

  removeClientFromTimer(timerId, clientId) {
    if (!this.timerExists(timerId)) {
      logExceptInTest(`removeClientFromTimer: Timer ${timerId} not found.`);
      return false;
    }

    else if (!this.clientExists(clientId)) {
      logExceptInTest(`removeClientFromTimer: User ${clientId} not found.`);
      return false;
    }

    else {
      const result = this.timerList[timerId].removeClient(clientId);

      if (result) {
        logExceptInTest(`User ${clientId} removed from Timer ${timerId}`);

        if (this.timerList[timerId].clients.length === 0) {
          this.timerGCList[timerId] = setInterval(() => {
            this.deleteTimer(timerId);
          }, timerGCDelay);
          logExceptInTest(`Mark unused Timer ${timerId} for deletion`);
        }
        
        return true;
      } else {
        logExceptInTest(`removeClientFromTimer: User ${clientId} not in Timer ${timerId}`);
        return false;        
      }
    }
  };

  removeClientFromAnyTimer(clientId) {
    if (!this.clientExists(clientId)) {
      logExceptInTest(`removeClientFromAnyTimer: User ${clientId} not found.`);
      return false;
    }

    else {
      for (var timerId in this.timerList) {
        if (this.timerList[timerId].clients.includes(clientId)) {
          return this.removeClientFromTimer(timerId, clientId);
        }
      }
    }

    logExceptInTest(`removeClientFromAnyTimer: Orphaned User ${clientId} found.`);
    return false;
  }
}

module.exports = RoomManager;