const { padDisplay } = require('../helpers/index');

class Timer {
  constructor(updateCallback) {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timerRunning = false;
    this.timerLoop = null;
    this.startTime = null;
    this.updateCallback = updateCallback;

    this.updateTimer = this.updateTimer.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  startTimer() {
    this.timerRunning = true;
    this.resetTimer();
    this.startTime = Date.now();
    this.timerLoop = setInterval(this.updateTimer, 100);
  }
  
  stopTimer() {
    this.timerRunning = false;
    clearInterval(this.timerLoop);
    this.timerLoop = null;
  }

  updateTimer() {
    let now = Date.now();
    let timeDiff = now - this.startTime; // in milliseconds
  
    let timeDiffInSeconds = timeDiff / 1000;
    this.hours = Math.floor(timeDiffInSeconds / 3600);
    this.minutes = Math.floor(timeDiffInSeconds / 60) % 60;
    this.seconds = Math.floor(timeDiffInSeconds % 60);

    if (this.updateCallback) {
      this.updateCallback(this.hours, this.minutes, this.seconds);
    }
  }

  resetTimer() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;

    if (this.updateCallback) {
      this.updateCallback(this.hours, this.minutes, this.seconds);
    }
  }

  getTime() {
    return {
      hours: padDisplay(this.hours, 2),
      minutes: padDisplay(this.minutes, 2),
      seconds: padDisplay(this.seconds, 2)
    };
  }
}

module.exports = Timer;