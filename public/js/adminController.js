'use strict';

var tableBodyEl;

var getDisplayElements = function() {
  tableBodyEl = document.getElementsByTagName('tbody')[0];
  initialize();
}

var updateDisplay = function (data) {
  if (tableBodyEl) {
    while (tableBodyEl.hasChildNodes()) {
      tableBodyEl.removeChild(tableBodyEl.lastChild);
    }

    // Table Body

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

      var timerUsersTD = document.createElement('td');
      var timerUsersUl = document.createElement('ul');
      timerUsersTD.appendChild(timerUsersUl);

      for (var i = 0; i < curTimer.clients.length; i++) {
        var userEntry = document.createElement('li');
        userEntry.innerText = curTimer.clients[i];
        timerUsersUl.appendChild(userEntry);
      }

      timerTR.appendChild(timerIdTD);
      timerTR.appendChild(timerStateTD);
      timerTR.appendChild(timerTimeTD);
      timerTR.appendChild(timerUsersTD);
      tableBodyEl.appendChild(timerTR);
    }
  }
}