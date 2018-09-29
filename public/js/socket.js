var socket = io();
var socketReady = false;

socket.on('connect', function() {
  socket.emit('handshake', 'Hi!');
  socketReady = true;

  // Events
  socket.on('update timer', function(time) {
    updateDisplay(time.hours, time.minutes, time.seconds);
  }); 
});

var sendStartSignal = function() {
  if (socketReady) {
    socket.emit('start timer');
  }
};

var sendStopSignal = function() {
  if (socketReady) {
    socket.emit('stop timer');
  }
};