var socket = io();

socket.on('connect', function() {
  socket.emit('handshake', 'Hi!');

  // Events
  socket.on('update timer', function(time) {
    console.log(time.hours + ':' + time.minutes + ':' + time.seconds);
  }); 
});