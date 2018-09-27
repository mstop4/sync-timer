let hours = 0;
let minutes = 0;
let seconds = 0;
let hoursDisplay;
let minutesDisplay;
let secondsDisplay;

let timerRunning = false;
let timerLoop = null;
let startTime = null;

document.addEventListener('DOMContentLoaded', function() {
  hoursDisplay = document.getElementById('hours-display');
  minutesDisplay = document.getElementById('minutes-display');
  secondsDisplay = document.getElementById('seconds-display');
  resetTimer();
});

const resetTimer = function() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  updateDisplay();
};

const startTimer = function() {
  timerRunning = true;
  resetTimer();
  startTime = Date.now();
  timerLoop = setInterval(updateTimer, 1);
};

const stopTimer = function() {
  timerRunning = false;
  clearInterval(timerLoop);
  timerLoop = null;
};

const padDisplay = function(value, places) {
  let valueStr = value.toString();

  if (valueStr.length < places) {
    valueStr = '0' + valueStr;
  }

  return valueStr;
};

const updateTimer = function() {
  let now = Date.now();
  let timeDiff = now - startTime; // in milliseconds

  let timeDiffInSeconds = timeDiff / 1000;
  hours = Math.floor(timeDiffInSeconds / 3600);
  minutes = Math.floor(timeDiffInSeconds / 60) % 60;
  seconds = Math.floor(timeDiffInSeconds % 60);
  updateDisplay();
};

const updateDisplay = function() {
  hoursDisplay.innerText = padDisplay(hours, 2);
  minutesDisplay.innerText = padDisplay(minutes, 2);
  secondsDisplay.innerText = padDisplay(seconds, 2);
};