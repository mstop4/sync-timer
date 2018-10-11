'use strict';

var hoursTens;
var hoursOnes;
var minutesTens;
var minutesOnes;
var secondsTens;
var secondsOnes;

var curHour = '';
var curMinute = '';
var curSecond = '';

var displayReady = false;

var startTimer = function() {
  sendStartSignal();
};

var stopTimer = function() {
  sendStopSignal();
};

var updateDisplay = function(hours, minutes, seconds) {
  if (displayReady &&
      (curHour !== hours ||
       curMinute !== minutes ||
       curSecond !== seconds)) {

    hoursTens.getElementsByClassName('back')[0].innerText = curHour.charAt(0);
    hoursOnes.getElementsByClassName('back')[0].innerText = curHour.charAt(1);
    minutesTens.getElementsByClassName('back')[0].innerText = curMinute.charAt(0);
    minutesOnes.getElementsByClassName('back')[0].innerText = curMinute.charAt(1);
    secondsTens.getElementsByClassName('back')[0].innerText = curSecond.charAt(0);
    secondsOnes.getElementsByClassName('back')[0].innerText = curSecond.charAt(1);

    hoursTens.getElementsByClassName('front')[0].innerText = hours.charAt(0);
    hoursOnes.getElementsByClassName('front')[0].innerText = hours.charAt(1);
    minutesTens.getElementsByClassName('front')[0].innerText = minutes.charAt(0);
    minutesOnes.getElementsByClassName('front')[0].innerText = minutes.charAt(1);
    secondsTens.getElementsByClassName('front')[0].innerText = seconds.charAt(0);
    secondsOnes.getElementsByClassName('front')[0].innerText = seconds.charAt(1);

    curHour = hours;
    curMinute = minutes;
    curSecond = seconds;
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