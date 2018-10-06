'use strict';

const timerTickInterval = 200;
const { padDisplay } = require('../helpers/index');

class Timer {
  constructor(updateCallback, id) {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timerRunning = false;
    this.timerLoop = null;
    this.startTime = null;
    this.clients = [];
    this.updateCallback = updateCallback;
    this.id = id;

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  startTimer() {
    this.timerRunning = true;
    this.resetTimer();
    this.startTime = Date.now();
    this.timerLoop = setInterval(this.updateTimer, timerTickInterval);
  }
  
  stopTimer() {
    this.timerRunning = false;
    if (this.timerLoop !== undefined && this.timerLoop._repeat) {
      clearInterval(this.timerLoop);
    }
  }

  updateTimer() {
    let now = Date.now();
    let timeDiff = now - this.startTime; // in milliseconds
  
    let timeDiffInSeconds = timeDiff / 1000;
    this.hours = Math.floor(timeDiffInSeconds / 3600);
    this.minutes = Math.floor(timeDiffInSeconds / 60) % 60;
    this.seconds = Math.floor(timeDiffInSeconds % 60);

    if (this.updateCallback) {
      this.updateCallback(this);
    }
  }

  resetTimer() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;

    if (this.updateCallback) {
      this.updateCallback(this);
    }
  }

  addClient(clientId) {
    if (!this.clients.includes(clientId)) {
      this.clients.push(clientId);
      return true;
    }

    return false;
  }

  removeClient(clientId) {
    if (this.clients.includes(clientId)) {
      this.clients.splice(this.clients.indexOf(clientId));
      return true;
    }

    return false;    
  }

  get time() {
    return {
      hours: padDisplay(this.hours, 2),
      minutes: padDisplay(this.minutes, 2),
      seconds: padDisplay(this.seconds, 2)
    };
  }

  get clients() {
    return this._clients;
  }

  set clients(newClients) {
    this._clients = newClients;
  }
}

module.exports = Timer;