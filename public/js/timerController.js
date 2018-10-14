'use strict';

var hoursTensFront;
var hoursOnesFront;
var minutesTensFront;
var minutesOnesFront;
var secondsTensFront;
var secondsOnesFront;
var hoursTensBack;
var hoursOnesBack;
var minutesTensBack;
var minutesOnesBack;
var secondsTensBack;
var secondsOnesBack;

var statusEl;

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

var resetTimer = function() {
  sendResetSignal();
}

var updateDisplay = function(hours, minutes, seconds) {
  if (displayReady) {
    if (curHour !== hours) {
      if (curHour.charAt(0) !== hours.charAt(0)) {
        hoursTensBack.innerText = curHour.charAt(0);
        hoursTensFront.innerText = hours.charAt(0);

        hoursTensBack.classList.remove('animate-out');
        hoursTensFront.classList.remove('animate-in');
        void hoursTensBack.offsetWidth;
        void hoursTensFront.offsetWidth;
        hoursTensBack.classList.add('animate-out');
        hoursTensFront.classList.add('animate-in');
      }

      if (curHour.charAt(1) !== hours.charAt(1)) {
        hoursOnesBack.innerText = curHour.charAt(1);
        hoursOnesFront.innerText = hours.charAt(1);

        hoursOnesBack.classList.remove('animate-out');
        hoursOnesFront.classList.remove('animate-in');
        void hoursOnesBack.offsetWidth;
        void hoursOnesFront.offsetWidth;
        hoursOnesBack.classList.add('animate-out');
        hoursOnesFront.classList.add('animate-in');
      }

      curHour = hours;
    }

    if (curMinute !== minutes) {
      if (curMinute.charAt(0) !== minutes.charAt(0)) {
        minutesTensBack.innerText = curMinute.charAt(0);
        minutesTensFront.innerText = minutes.charAt(0);

        minutesTensBack.classList.remove('animate-out');
        minutesTensFront.classList.remove('animate-in');
        void minutesTensBack.offsetWidth;
        void minutesTensFront.offsetWidth;
        minutesTensBack.classList.add('animate-out');
        minutesTensFront.classList.add('animate-in');
      }

      if (curMinute.charAt(1) !== minutes.charAt(1)) {
        minutesOnesBack.innerText = curMinute.charAt(1);
        minutesOnesFront.innerText = minutes.charAt(1);

        minutesOnesBack.classList.remove('animate-out');
        minutesOnesFront.classList.remove('animate-in');
        void minutesOnesBack.offsetWidth;
        void minutesOnesFront.offsetWidth;
        minutesOnesBack.classList.add('animate-out');
        minutesOnesFront.classList.add('animate-in');
      }

      curMinute = minutes;
    }

    if (curSecond !== seconds) {
      if (curSecond.charAt(0) !== seconds.charAt(0)) {
        secondsTensBack.innerText = curSecond.charAt(0);
        secondsTensFront.innerText = seconds.charAt(0);

        secondsTensBack.classList.remove('animate-out');
        secondsTensFront.classList.remove('animate-in');
        void secondsTensBack.offsetWidth;
        void secondsTensFront.offsetWidth;
        secondsTensBack.classList.add('animate-out');
        secondsTensFront.classList.add('animate-in');
      }

      if (curSecond.charAt(1) !== seconds.charAt(1)) {
        secondsOnesBack.innerText = curSecond.charAt(1);
        secondsOnesFront.innerText = seconds.charAt(1);

        secondsOnesBack.classList.remove('animate-out');
        secondsOnesFront.classList.remove('animate-in');
        void secondsOnesBack.offsetWidth;
        void secondsOnesFront.offsetWidth;
        secondsOnesBack.classList.add('animate-out');
        secondsOnesFront.classList.add('animate-in');
      }

      curSecond = seconds;
    }
  }
};

var getDisplayElements = function() {
  hoursTensFront = document.getElementById('hours-tens').getElementsByClassName('front')[0];
  hoursOnesFront = document.getElementById('hours-ones').getElementsByClassName('front')[0];
  minutesTensFront = document.getElementById('minutes-tens').getElementsByClassName('front')[0];
  minutesOnesFront = document.getElementById('minutes-ones').getElementsByClassName('front')[0];
  secondsTensFront = document.getElementById('seconds-tens').getElementsByClassName('front')[0];
  secondsOnesFront = document.getElementById('seconds-ones').getElementsByClassName('front')[0];
  hoursTensBack = document.getElementById('hours-tens').getElementsByClassName('back')[0];
  hoursOnesBack = document.getElementById('hours-ones').getElementsByClassName('back')[0];
  minutesTensBack = document.getElementById('minutes-tens').getElementsByClassName('back')[0];
  minutesOnesBack = document.getElementById('minutes-ones').getElementsByClassName('back')[0];
  secondsTensBack = document.getElementById('seconds-tens').getElementsByClassName('back')[0];
  secondsOnesBack = document.getElementById('seconds-ones').getElementsByClassName('back')[0];

  statusEl = document.getElementById('running-state');

  displayReady = true;
  initialize();
};