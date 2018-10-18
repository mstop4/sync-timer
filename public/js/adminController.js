'use strict';

var timerTableEl = document.getElementById('timerTable');

var getDisplayElements = function() {
  initialize();
}

var updateDisplay = function (data) {
  while (timerTableEl.childNodes[0]) {
    timerTableEl.removeChild(timerTableEl.childNodes[0]);
  }

  // Table Heading

  var timerIdTH = document.createElement('th');
  timerIdTH.innerText = 'ID';
  timerIdTH.classList.add('narrow-column');
  var timerStateTH = document.createElement('th');
  timerStateTH.innerText = 'State';
  timerStateTH.classList.add('narrow-column');
  var timerTimeTH = document.createElement('th');
  timerTimeTH.innerText = 'Time';
  timerTimeTH.classList.add('narrow-column');
  var timerUsersTH = document.createElement('th');
  timerUsersTH.innerText = 'Users';

  var timerHeadTR = document.createElement('tr');
  timerHeadTR.appendChild(timerIdTH);
  timerHeadTR.appendChild(timerStateTH);
  timerHeadTR.appendChild(timerTimeTH);
  timerHeadTR.appendChild(timerUsersTH);

  timerTableEl.appendChild(timerHeadTR);

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
    timerTableEl.appendChild(timerTR);
  }
}