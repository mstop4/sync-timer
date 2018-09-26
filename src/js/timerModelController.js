let timerRunning = false;
let hours = 12;
let minutes = 0;
let seconds = 0;

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