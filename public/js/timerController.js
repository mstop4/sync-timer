var hoursDisplay;
var minutesDisplay;
var secondsDisplay;

var startTimer = function() {
  sendStartSignal();
};

var stopTimer = function() {
  sendStopSignal();
};

var updateDisplay = function(hours, minutes, seconds) {
  hoursDisplay.innerText = hours;
  minutesDisplay.innerText = minutes;
  secondsDisplay.innerText = seconds;
};

document.addEventListener('DOMContentLoaded', function() {
  hoursDisplay = document.getElementById('hours-display');
  minutesDisplay = document.getElementById('minutes-display');
  secondsDisplay = document.getElementById('seconds-display');
});