'use strict';

var hoursTens;
var hoursOnes;
var minutesTens;
var minutesOnes;
var secondsTens;
var secondsOnes;
var displayReady = false;

var startTimer = function() {
  sendStartSignal();
};

var stopTimer = function() {
  sendStopSignal();
};

var updateDisplay = function(hours, minutes, seconds) {
  if (displayReady) {
    hoursTens.innerText = hours.charAt(0);
    hoursOnes.innerText = hours.charAt(1);
    minutesTens.innerText = minutes.charAt(0);
    minutesOnes.innerText = minutes.charAt(1);
    secondsTens.innerText = seconds.charAt(0);
    secondsOnes.innerText = seconds.charAt(1);
  }
};

var getDisplayElements = function() {
  hoursTens = document.getElementById('hours-tens');
  hoursOnes = document.getElementById('hours-ones');
  minutesTens = document.getElementById('minutes-tens');
  minutesOnes = document.getElementById('minutes-ones');
  secondsTens = document.getElementById('seconds-tens');
  secondsOnes = document.getElementById('seconds-ones');
  displayReady = true;
  initialize();
};