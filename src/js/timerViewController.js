let hoursDisplay;
let minutesDisplay;
let secondsDisplay;

let hours = 0;
let minutes = 0;
let seconds = 0;

document.addEventListener('DOMContentLoaded', function() {
  hoursDisplay = document.getElementById('hours-display');
  minutesDisplay = document.getElementById('minutes-display');
  secondsDisplay = document.getElementById('seconds-display');

  updateDisplay(hours, minutes, seconds);
});

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