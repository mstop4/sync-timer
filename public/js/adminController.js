'use strict';

var timerTableEl = document.getElementById('timerTable');

var getDisplayElements = function() {
  initialize();
}

var updateDisplay = function (data) {
  while (timerTableEl.childNodes[0]) {
    timerTableEl.removeChild(timerTableEl.childNodes[0]);
  }

  var timerIdTH = document.createElement('th');
  timerIdTH.innerText = 'ID';
  var timerStateTH = document.createElement('th');
  timerStateTH.innerText = 'State';
  var timerTimeTH = document.createElement('th');
  timerTimeTH.innerText = 'Time';

  var timerHeadTR = document.createElement('tr');
  timerHeadTR.appendChild(timerIdTH);
  timerHeadTR.appendChild(timerStateTH);
  timerHeadTR.appendChild(timerTimeTH);

  timerTableEl.appendChild(timerHeadTR);

  for (var timer in data.timerList) {
    var curTimer = data.timerList[timer];

    var timerTR = document.createElement('tr');

    var timerIdTD = document.createElement('td');
    timerIdTD.innerText = curTimer.id;

    var timerStateTD = document.createElement('td');

    switch (curTimer.timerRunning) {
      case TIMERSTATE.STOPPED:
        timerStateTD.innerText = 'Stopped';
        break;

      case TIMERSTATE.SUSPENDED:
        timerStateTD.innerText = 'Suspended';
        break;
    
      case TIMERSTATE.RUNNING:
        timerStateTD.innerText = 'Running';
        break;
    }

    var timerTimeTD = document.createElement('td');
    timerTimeTD.innerText = padDisplay(curTimer.hours, 2) + ':' + padDisplay(curTimer.minutes, 2) + ':' + padDisplay(curTimer.seconds, 2);

    timerTR.appendChild(timerIdTD);
    timerTR.appendChild(timerStateTD);
    timerTR.appendChild(timerTimeTD);
    timerTableEl.appendChild(timerTR);
  }
}