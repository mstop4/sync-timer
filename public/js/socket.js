'use strict';

var socket = io();
var myTimerId = null;

socket.on('connect', function() {

  // Events
  socket.on('assign timerId', function(id) {
    myTimerId = id;
    console.log(`My Timer ID is: ${myTimerId}`);
  });

  socket.on('update timer', function(time) {
    updateDisplay(time.hours, time.minutes, time.seconds);
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

var initTime = function() {
  if (myTimerId !== null) {
    socket.emit('get time', myTimerId);
  } else {
    setTimeout(initTime, 1000);
  }
}