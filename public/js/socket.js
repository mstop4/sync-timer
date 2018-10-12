'use strict';

var socket = io();

socket.on('connect', function() {

  // Events
  socket.on('done set up', function(data) {
    myTimerId = myTimerId ? myTimerId : data.timerId;
    var timerEl = document.getElementById('timerId');
    timerEl.innerText = myTimerId;
    socket.emit('get time', myTimerId);
  });

  socket.on('update timer', function(time) {
    updateDisplay(time.hours, time.minutes, time.seconds);
  }); 

  socket.on('timer started', function(time) {
    statusEl.innerText = 'Running';
  }); 

  socket.on('timer stopped', function(time) {
    statusEl.innerText = 'Stopped';
  }); 


  socket.on('new user joining', function(data) {
    if (data.clientId !== socket.id) {
      console.log('User ' + data.clientId + 'has joined in.');
    };
  });
});

var sendStartSignal = function() {
  if (socket.connected && myTimerId !== null) {
    socket.emit('start timer', myTimerId);
  }
};

var sendStopSignal = function() {
  if (socket.connected && myTimerId !== null) {
    socket.emit('stop timer', myTimerId);
  }
};

var initialize = function() {
  socket.emit('set up', myTimerId);
}