'use strict';

var hoursDisplay;
var minutesDisplay;
var secondsDisplay;
var displayReady = false;

var startTimer = function() {
  sendStartSignal();
};

var stopTimer = function() {
  sendStopSignal();
};

var updateDisplay = function(hours, minutes, seconds) {
  if (displayReady) {
    hoursDisplay.innerText = hours;
    minutesDisplay.innerText = minutes;
    secondsDisplay.innerText = seconds;
  }
};

var getDisplayElements = function() {
  hoursDisplay = document.getElementById('hours-display');
  minutesDisplay = document.getElementById('minutes-display');
  secondsDisplay = document.getElementById('seconds-display');
  displayReady = true;
  initialize();
};