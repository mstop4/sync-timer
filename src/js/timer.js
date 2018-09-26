let timerRunning = false;
let hours = 12;
let minutes = 0;
let seconds = 0;

let hoursDisplay;
let minutesDisplay;
let secondsDisplay;

document.addEventListener('DOMContentLoaded', function() {
  hoursDisplay = document.getElementById('hours-display');
  minutesDisplay = document.getElementById('minutes-display');
  secondsDisplay = document.getElementById('seconds-display');

  updateDisplay(hours, minutes, seconds);
});

const resetTimer = function() {
  hours = 0;
  minutes = 0;
  seconds = 0;
}

const startTimer = function() {
  timerRunning = true;
}

const stopTimer = function() {
  timerRunning = false;
}

const padDisplay = function(value, places) {
  let valueStr = value.toString();

  if (valueStr.length < places) {
    valueStr = '0' + valueStr;
  }

  return valueStr;
}

const updateDisplay = function(hrs, mins, secs) {
  hoursDisplay.innerText = padDisplay(hrs, 2);
  minutesDisplay.innerText = padDisplay(mins, 2);
  secondsDisplay.innerText = padDisplay(secs, 2);
}