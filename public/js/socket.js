'use strict';

var socket = io();
var myTimerId = null;

socket.on('connect', function() {
  socket.emit('handshake', 'Hi!');

  // Events
  socket.on('assign id', function(id) {
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