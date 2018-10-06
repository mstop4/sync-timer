function gotoTimer() {
  var timerIdFieldEl = document.getElementById('timer-id-field');
  window.location.href = 'timer/' + timerIdFieldEl.value;
}