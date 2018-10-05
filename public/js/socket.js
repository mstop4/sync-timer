'use strict';

var socket = io();
//var myTimerId = null;

socket.on('connect', function() {

  // Events
  socket.on('done set up', function() {
    socket.emit('get time', myTimerId);
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

var initialize = function() {
  socket.emit('set up', myTimerId);
}