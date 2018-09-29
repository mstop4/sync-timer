var hoursDisplay;
var minutesDisplay;
var secondsDisplay;

document.addEventListener('DOMContentLoaded', function() {
  hoursDisplay = document.getElementById('hours-display');
  minutesDisplay = document.getElementById('minutes-display');
  secondsDisplay = document.getElementById('seconds-display');
  resetTimer();
});

var resetTimer = function() {
  
};

var startTimer = function() {

};

var stopTimer = function() {

};

var updateDisplay = function(hours, minutes, seconds) {
  hoursDisplay.innerText = padDisplay(hours, 2);
  minutesDisplay.innerText = padDisplay(minutes, 2);
  secondsDisplay.innerText = padDisplay(seconds, 2);
};