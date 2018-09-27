class Timer {
  constructor() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timerRunning = false;
    this.timerLoop = null;
    this.startTime = null;

    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  startTimer() {
    this.timerRunning = true;
    this.resetTimer();
    this.startTime = Date.now();
    this.timerLoop = setInterval(this.updateTimer, 1);
  }
  
  stopTimer() {
    this.timerRunning = false;
    clearInterval(this.timerLoop);
    this.timerLoop = null;
  }

  updateDisplay() {
    
  }

  updateTimer() {
    let now = Date.now();
    let timeDiff = now - this.startTime; // in milliseconds
  
    let timeDiffInSeconds = timeDiff / 1000;
    this.hours = Math.floor(timeDiffInSeconds / 3600);
    this.minutes = Math.floor(timeDiffInSeconds / 60) % 60;
    this.seconds = Math.floor(timeDiffInSeconds % 60);
    this.updateDisplay();
  }

  resetTimer() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.updateDisplay();
  }

  padDisplay(value, places) {
    let valueStr = value.toString();
  
    if (valueStr.length < places) {
      valueStr = '0' + valueStr;
    }
  
    return valueStr;
  }
}

module.exports = Timer;