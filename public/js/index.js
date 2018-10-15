function initialize() {
  var timerIdFieldEl = document.getElementById('timer-id-field');
  timerIdFieldEl.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      gotoTimer();
    }
  });
}

function gotoTimer() {
  var timerIdFieldEl = document.getElementById('timer-id-field');
  window.location.href = 'timer/' + timerIdFieldEl.value;
}