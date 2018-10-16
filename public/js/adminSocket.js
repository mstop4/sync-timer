'use strict';

var socket = io();

socket.on('connect', function() {
  
  // Events
  socket.on('update info', function(data) {
    if (data) {
      updateDisplay(data);
    }
  }); 
  
  socket.on('info error', function() {
    showError();
  });

  socket.on('disconnect', function() {
    showError();
  });
});

var initialize = function() {
  socket.emit('admin set up');
}

var showError = function() {
}